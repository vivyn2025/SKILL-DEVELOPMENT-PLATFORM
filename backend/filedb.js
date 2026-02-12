const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'dev.json');

async function ensureDataFile() {
    const dir = path.dirname(DATA_FILE);
    try { await fs.mkdir(dir, { recursive: true }); } catch (e) { }
    try {
        await fs.access(DATA_FILE);
    } catch (e) {
        const initial = { users: [], courses: [], progress: [] };
        // Create initial dummy course
        initial.courses.push({
            id: 1,
            title: 'Intro to Git',
            description: 'Learn Git basics',
            modules: [
                {
                    id: 1,
                    course_id: 1,
                    title: 'Basics',
                    lessons: [
                        { id: 1, module_id: 1, title: 'What is Git?', type: 'text', contentText: 'Git is a version control system.' },
                        { id: 2, module_id: 1, title: 'Installing Git', type: 'video', contentUrl: 'https://www.youtube.com/watch?v=MJUJ4wbFm_A' }
                    ]
                }
            ]
        });
        await fs.writeFile(DATA_FILE, JSON.stringify(initial, null, 2));
    }
}

async function read() {
    await ensureDataFile();
    const txt = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(txt);
}

async function write(obj) {
    await fs.writeFile(DATA_FILE, JSON.stringify(obj, null, 2));
}

async function init() { await ensureDataFile(); }

// New schema adapters
async function getCourses() {
    const db = await read();
    return db.courses;
}

async function getCourseById(id) {
    const db = await read();
    return db.courses.find(c => c.id === id);
}

async function findUserByEmail(email) {
    const db = await read();
    return db.users.find(u => u.email === email);
}

async function insertUser(email, password_hash) {
    const db = await read();
    const id = db.users.length ? Math.max(...db.users.map(u => u.id)) + 1 : 1;
    const user = { id, email, password_hash, role: 'student', created_at: new Date().toISOString() };
    db.users.push(user);
    await write(db);
    return user;
}

async function getUserById(id) {
    const db = await read();
    return db.users.find(u => u.id === id);
}

// Progress now stores individual lesson progress
async function getProgressForUser(userId, courseId) {
    const db = await read();
    // Filter progress for this user and lessons belonging to this course
    // Simple check: get all progress for user, then filter by course structure is hard without joining.
    // Actually, we can just return all progress for the user and let frontend/backend filter, 
    // or do a manual join here.
    // The backend expects specific output for /api/progress/:courseId
    const course = db.courses.find(c => c.id === courseId);
    if (!course) return [];

    const lessonIds = new Set();
    if (course.modules) {
        course.modules.forEach(m => {
            if (m.lessons) m.lessons.forEach(l => lessonIds.add(l.id));
        });
    }

    return db.progress.filter(p => p.user_id === userId && lessonIds.has(p.lesson_id));
}

async function setProgress(userId, lessonId, completed) {
    const db = await read();
    if (completed) {
        if (!db.progress.some(p => p.user_id === userId && p.lesson_id === lessonId)) {
            db.progress.push({ user_id: userId, lesson_id: lessonId, completed_at: new Date().toISOString() });
        }
    } else {
        db.progress = db.progress.filter(p => !(p.user_id === userId && p.lesson_id === lessonId));
    }
    await write(db);
}

// Admin Create Course
async function insertCourse(title, description, modules) {
    const db = await read();
    const id = db.courses.length ? Math.max(...db.courses.map(c => c.id)) + 1 : 1;

    // modules/lessons need IDs too
    let modIdCounter = 100 * id;
    let lessIdCounter = 1000 * id;

    const newModules = (modules || []).map((m, i) => ({
        id: modIdCounter + i,
        course_id: id,
        title: m.title,
        sort_order: i,
        lessons: (m.lessons || []).map((l, j) => ({
            id: lessIdCounter + j,
            module_id: modIdCounter + i,
            title: l.title,
            type: l.type,
            contentUrl: l.contentUrl,
            contentText: l.contentText,
            sort_order: j
        }))
    }));

    const course = { id, title, description, modules: newModules, created_at: new Date().toISOString() };
    db.courses.push(course);
    await write(db);
    return id;
}

// Onboarding
async function getQuestions() {
    const db = await read();
    return db.questions || [];
}

module.exports = { init, getCourses, getCourseById, findUserByEmail, insertUser, getUserById, getProgressForUser, setProgress, insertCourse, getQuestions };
