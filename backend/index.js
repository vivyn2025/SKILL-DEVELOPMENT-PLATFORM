require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

// DB Configuration
let isSqlite = !process.env.DATABASE_URL; // Using "isSqlite" var name for consistency, though it's filedb
let pool = null;
let filedb = null;

if (!isSqlite) {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
} else {
  console.log('Running in local mode with filedb (no DATABASE_URL)');
  filedb = require('./filedb');
}

// --- Migrations (Postgres Only) ---
async function runMigrations() {
  if (isSqlite) {
    await filedb.init();
    return;
  }
  console.log('Checking migrations...');
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        applied_at TIMESTAMPTZ DEFAULT now()
      );
    `);

    const files = await fs.readdir(path.join(__dirname, 'migrations'));
    const sqlFiles = files.filter(f => f.endsWith('.sql')).sort();

    for (const file of sqlFiles) {
      const res = await client.query('SELECT id FROM migrations WHERE name = $1', [file]);
      if (res.rowCount === 0) {
        console.log(`Running migration: ${file}`);
        const content = await fs.readFile(path.join(__dirname, 'migrations', file), 'utf8');
        const upSql = content.split('-- Down')[0];

        await client.query('BEGIN');
        try {
          await client.query(upSql);
          await client.query('INSERT INTO migrations (name) VALUES ($1)', [file]);
          await client.query('COMMIT');
        } catch (err) {
          await client.query('ROLLBACK');
          throw err;
        }
      }
    }
    console.log('Migrations up to date.');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    client.release();
  }
}

// --- Middleware ---
function authMiddleware(req, res, next) {
  const h = req.headers.authorization;
  if (!h) return res.status(401).json({ error: 'missing auth' });
  const parts = h.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'invalid auth' });
  try {
    const payload = jwt.verify(parts[1], JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
}

// --- Auth Routes ---
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email+password required' });
  try {
    const hash = await bcrypt.hash(password, 10);
    if (!isSqlite) {
      const result = await pool.query(
        'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, role',
        [email, hash]
      );
      const user = result.rows[0];
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user });
    } else {
      const existing = await filedb.findUserByEmail(email);
      if (existing) return res.status(409).json({ error: 'user exists' });
      const user = await filedb.insertUser(email, hash);
      const token = jwt.sign({ userId: user.id, role: 'student' }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: user.id, email: user.email, role: 'student' } });
    }
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ error: 'user exists' });
    console.error(err);
    res.status(500).json({ error: 'register failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user;
    if (!isSqlite) {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rowCount === 0) return res.status(401).json({ error: 'invalid credentials' });
      user = result.rows[0];
    } else {
      user = await filedb.findUserByEmail(email);
      if (!user) return res.status(401).json({ error: 'invalid credentials' });
    }

    if (!await bcrypt.compare(password, user.password_hash)) {
      return res.status(401).json({ error: 'invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id, role: user.role || 'student' }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role || 'student' } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'login failed' });
  }
});

app.get('/api/me', authMiddleware, async (req, res) => {
  try {
    if (!isSqlite) {
      const result = await pool.query('SELECT id, email, role, created_at FROM users WHERE id = $1', [req.userId]);
      if (result.rowCount === 0) return res.status(404).json({ error: 'not found' });
      res.json(result.rows[0]);
    } else {
      const u = await filedb.getUserById(req.userId);
      if (!u) return res.status(404).json({ error: 'not found' });
      res.json(u);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});

// --- Course Routes ---
app.get('/api/courses', async (req, res) => {
  try {
    if (!isSqlite) {
      const result = await pool.query('SELECT * FROM courses ORDER BY created_at DESC');
      res.json(result.rows);
    } else {
      const courses = await filedb.getCourses();
      res.json(courses);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});

app.get('/api/courses/:id', async (req, res) => {
  const courseId = parseInt(req.params.id);
  try {
    if (!isSqlite) {
      const courseRes = await pool.query('SELECT * FROM courses WHERE id = $1', [courseId]);
      if (courseRes.rowCount === 0) return res.status(404).json({ error: 'not found' });

      const modulesRes = await pool.query(`
        SELECT m.id as module_id, m.title as module_title, m.sort_order as module_sort,
               l.id as lesson_id, l.title as lesson_title, l.type, l.duration, l.content_url, l.content_text, l.sort_order as lesson_sort
        FROM modules m
        LEFT JOIN lessons l ON l.module_id = m.id
        WHERE m.course_id = $1
        ORDER BY m.sort_order, l.sort_order
      `, [courseId]);

      const modulesMap = new Map();
      modulesRes.rows.forEach(row => {
        if (!modulesMap.has(row.module_id)) {
          modulesMap.set(row.module_id, {
            id: row.module_id,
            title: row.module_title,
            lessons: []
          });
        }
        if (row.lesson_id) {
          modulesMap.get(row.module_id).lessons.push({
            id: row.lesson_id,
            title: row.lesson_title,
            type: row.type,
            duration: row.duration,
            contentUrl: row.content_url,
            contentText: row.content_text
          });
        }
      });
      const course = courseRes.rows[0];
      course.modules = Array.from(modulesMap.values());
      res.json(course);
    } else {
      const c = await filedb.getCourseById(courseId);
      if (!c) return res.status(404).json({ error: 'not found' });
      res.json(c);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});

// --- Progress Routes ---
app.get('/api/progress/:courseId', authMiddleware, async (req, res) => {
  const courseId = parseInt(req.params.courseId);
  try {
    if (!isSqlite) {
      const result = await pool.query(`
        SELECT p.lesson_id, p.completed_at 
        FROM progress p
        JOIN lessons l ON p.lesson_id = l.id
        JOIN modules m ON l.module_id = m.id
        WHERE p.user_id = $1 AND m.course_id = $2
      `, [req.userId, courseId]);
      res.json(result.rows);
    } else {
      const p = await filedb.getProgressForUser(req.userId, courseId);
      res.json(p);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});

app.post('/api/progress', authMiddleware, async (req, res) => {
  const { lessonId, completed } = req.body;
  try {
    if (!isSqlite) {
      if (completed) {
        await pool.query(
          'INSERT INTO progress (user_id, lesson_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
          [req.userId, lessonId]
        );
      } else {
        await pool.query(
          'DELETE FROM progress WHERE user_id = $1 AND lesson_id = $2',
          [req.userId, lessonId]
        );
      }
    } else {
      await filedb.setProgress(req.userId, lessonId, completed);
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});

// --- Onboarding Routes ---
app.get('/api/onboarding/questions', async (req, res) => {
  try {
    if (!isSqlite) {
      // Postgres implementation would go here (requires new table)
      // For MVP/Mixed mode, we might just return static JSON or empty
      res.json([]);
    } else {
      const q = await filedb.getQuestions();
      res.json(q);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});

app.post('/api/onboarding/submit', authMiddleware, async (req, res) => {
  // Expected body: { answers: { questionId: [selectedTag, ...] } }
  // or simple: { tags: ['Development', 'Design'] }
  // Let's go with computing tags on frontend for simplicity, or sending answers and computing here.
  // For this MVP, let's accept a list of "preferredCategories" directly from the frontend analysis
  // OR just answers. Let's do answers for realism.
  // Body: { answers: { "1": ["Development"], "2": ["Design"] } }

  const { answers } = req.body;

  try {
    // simple logic: aggregate tags
    // In a real app we'd save this to a 'user_profiles' table.
    // For this MVP, we'll just return recommended courses based on matching categories.

    // We need the questions to map answers to tags if we only receive IDs, 
    // but to save backend work let's assume frontend sends derived tags or we just fetch all courses
    // and filter by whatever logic. 
    // Let's keep it simple: Frontend sends "tags".

    const tags = req.body.tags || []; // e.g. ['Development', 'Design']

    let allCourses = [];
    if (!isSqlite) {
      const r = await pool.query('SELECT * FROM courses');
      allCourses = r.rows;
    } else {
      allCourses = await filedb.getCourses();
    }

    // Filter courses that match at least one tag in their category or skills
    // Assuming 'category' field exists in courses (added in seed)
    const recommended = allCourses.filter(c => {
      if (tags.includes(c.category)) return true;
      // also check skills if any overlap
      // c.skills might be array or string depending on DB
      const skills = Array.isArray(c.skills) ? c.skills : [];
      return skills.some(s => tags.includes(s));
    });

    res.json({ recommended });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});

// --- Admin Routes (Simplified) ---
app.post('/api/admin/courses', authMiddleware, async (req, res) => {
  const { title, description, modules } = req.body;

  try {
    if (!isSqlite) {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        const courseRes = await client.query(
          'INSERT INTO courses (title, description) VALUES ($1, $2) RETURNING id',
          [title, description]
        );
        const courseId = courseRes.rows[0].id;

        if (modules && Array.isArray(modules)) {
          for (const [mIdx, mod] of modules.entries()) {
            const modRes = await client.query(
              'INSERT INTO modules (course_id, title, sort_order) VALUES ($1, $2, $3) RETURNING id',
              [courseId, mod.title, mIdx]
            );
            const modId = modRes.rows[0].id;

            if (mod.lessons && Array.isArray(mod.lessons)) {
              for (const [lIdx, less] of mod.lessons.entries()) {
                await client.query(
                  'INSERT INTO lessons (module_id, title, type, content_url, content_text, sort_order) VALUES ($1, $2, $3, $4, $5, $6)',
                  [modId, less.title, less.type, less.contentUrl, less.contentText, lIdx]
                );
              }
            }
          }
        }
        await client.query('COMMIT');
        res.json({ id: courseId });
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    } else {
      const id = await filedb.insertCourse(title, description, modules);
      res.json({ id });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'failed' });
  }
});


const PORT = process.env.PORT || 4000;

async function start() {
  await runMigrations();
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}

start();

