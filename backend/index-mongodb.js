require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./models/User');
const Skill = require('./models/Skill');
const Assessment = require('./models/Assessment');
const UserSkillProgress = require('./models/UserSkillProgress');
const LearningStep = require('./models/LearningStep');

const app = express();
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, Postman)
        if (!origin) return callback(null, true);
        // Allow any vercel.app domain, localhost, and your custom domains
        const allowed = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
            || origin.endsWith('.vercel.app');
        if (allowed) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skill_platform';
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
        process.exit(1);
    });

// --- Middleware ---
function authMiddleware(req, res, next) {
    const h = req.headers.authorization;
    if (!h) return res.status(401).json({ error: 'missing auth' });
    const parts = h.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'invalid auth' });
    }
    try {
        const payload = jwt.verify(parts[1], JWT_SECRET);
        req.userId = payload.userId;
        req.userRole = payload.role;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'invalid token' });
    }
}

function adminMiddleware(req, res, next) {
    if (req.userRole !== 'admin') {
        return res.status(403).json({ error: 'admin access required' });
    }
    next();
}

// --- Auth Routes ---
app.post('/api/auth/register', async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'email and password required' });
    }
    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({ error: 'user exists' });
        }

        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            password_hash: hash,
            name: name || '',
            role: 'student'
        });

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'register failed' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`Login attempt for: ${email}`);
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'invalid credentials' });
        }

        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(401).json({ error: 'invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'login failed' });
    }
});

app.get('/api/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password_hash');
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        res.json({
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            createdAt: user.createdAt
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed' });
    }
});

// --- Skill Routes ---
app.get('/api/skills', async (req, res) => {
    try {
        const skills = await Skill.find().sort({ createdAt: -1 });
        res.json(skills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed' });
    }
});

app.get('/api/skills/:id', async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) {
            return res.status(404).json({ error: 'skill not found' });
        }
        res.json(skill);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed' });
    }
});

app.post('/api/admin/skills', authMiddleware, adminMiddleware, async (req, res) => {
    const { name, category, description, difficulty } = req.body;
    try {
        const skill = await Skill.create({ name, category, description, difficulty });
        res.json(skill);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed' });
    }
});

// --- User Progress Routes ---
app.get('/api/progress', authMiddleware, async (req, res) => {
    try {
        const progress = await UserSkillProgress.find({ userId: req.userId })
            .populate('skillId')
            .sort({ lastUpdated: -1 });

        // Filter out records where skill was not found and transform
        const transformed = progress
            .filter(p => p.skillId)
            .map(p => ({
                id: p.skillId._id.toString(),
                name: p.skillId.name,
                category: p.skillId.category,
                currentLevel: p.currentLevel,
                targetLevel: p.targetLevel,
                score: p.score
            }));

        res.json(transformed);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed' });
    }
});

app.post('/api/progress', authMiddleware, async (req, res) => {
    const { skillId, currentLevel, targetLevel, score } = req.body;
    try {
        const progress = await UserSkillProgress.findOneAndUpdate(
            { userId: req.userId, skillId },
            {
                currentLevel,
                targetLevel,
                score,
                lastUpdated: new Date()
            },
            { upsert: true, new: true }
        );
        res.json(progress);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed' });
    }
});

app.get('/api/progress/gaps', authMiddleware, async (req, res) => {
    try {
        const progress = await UserSkillProgress.find({ userId: req.userId })
            .populate('skillId');

        // Calculate gaps and severity
        const gaps = progress
            .filter(p => p.currentLevel < p.targetLevel)
            .map(p => {
                const gapPercentage = Math.round(((p.targetLevel - p.currentLevel) / p.targetLevel) * 100);
                let severity = 'low';
                if (gapPercentage >= 50) severity = 'high';
                else if (gapPercentage >= 30) severity = 'medium';

                return {
                    id: p.skillId._id,
                    name: p.skillId.name,
                    currentLevel: p.currentLevel,
                    targetLevel: p.targetLevel,
                    gapPercentage,
                    severity
                };
            })
            .sort((a, b) => b.gapPercentage - a.gapPercentage);

        res.json(gaps);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed' });
    }
});

// --- Assessment Routes ---
app.get('/api/assessments', async (req, res) => {
    try {
        const assessments = await Assessment.find()
            .populate('skillId', 'name category')
            .select('-questions'); // Don't send questions in list view
        res.json(assessments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed' });
    }
});

app.get('/api/assessments/:id', async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id)
            .populate('skillId', 'name category');
        if (!assessment) {
            return res.status(404).json({ error: 'assessment not found' });
        }
        res.json(assessment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed' });
    }
});

app.post('/api/assessments/:id/submit', authMiddleware, async (req, res) => {
    const { answers } = req.body; // { questionIndex: selectedOptionIndex }
    try {
        const assessment = await Assessment.findById(req.params.id);
        if (!assessment) {
            return res.status(404).json({ error: 'assessment not found' });
        }

        // Calculate score
        let correct = 0;
        assessment.questions.forEach((q, idx) => {
            if (answers[idx] === q.correctAnswer) {
                correct++;
            }
        });

        const scorePercentage = Math.round((correct / assessment.questions.length) * 100);

        // Update user progress
        const skillId = assessment.skillId;
        const progress = await UserSkillProgress.findOne({
            userId: req.userId,
            skillId
        });

        if (progress) {
            progress.completedAssessments.push({
                assessmentId: assessment._id,
                score: scorePercentage,
                completedAt: new Date()
            });

            // Update overall score (average of all assessments)
            const totalScore = progress.completedAssessments.reduce((sum, a) => sum + a.score, 0);
            progress.score = Math.round(totalScore / progress.completedAssessments.length);

            // Auto-increment level based on score
            if (scorePercentage >= 80 && progress.currentLevel < progress.targetLevel) {
                progress.currentLevel = Math.min(progress.currentLevel + 1, 10);
            }

            progress.lastUpdated = new Date();
            await progress.save();
        }

        res.json({
            correct,
            total: assessment.questions.length,
            score: scorePercentage
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed' });
    }
});

// --- Learning Path Routes ---
app.get('/api/learning-path', authMiddleware, async (req, res) => {
    try {
        const steps = await LearningStep.find({ userId: req.userId })
            .sort({ priority: 1, createdAt: 1 });
        res.json(steps);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed' });
    }
});

app.put('/api/learning-path/:id', authMiddleware, async (req, res) => {
    const { status } = req.body;
    try {
        const step = await LearningStep.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            { status },
            { new: true }
        );
        if (!step) {
            return res.status(404).json({ error: 'step not found' });
        }
        res.json(step);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed' });
    }
});

// --- Admin Routes ---
app.get('/api/admin/stats', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalAssessments = await Assessment.countDocuments();

        // Calculate average score across all users
        const allProgress = await UserSkillProgress.find();
        const avgScore = allProgress.length > 0
            ? Math.round(allProgress.reduce((sum, p) => sum + p.score, 0) / allProgress.length)
            : 0;

        // Active users (updated in last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const activeUsers = await UserSkillProgress.distinct('userId', {
            lastUpdated: { $gte: sevenDaysAgo }
        });

        res.json({
            totalUsers,
            totalAssessments,
            averageScore: avgScore,
            activeUsers: activeUsers.length
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed' });
    }
});

app.get('/api/admin/users', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const users = await User.find({ role: 'student' })
            .select('-password_hash')
            .lean();

        // Enhance with progress data
        const usersWithStats = await Promise.all(users.map(async (user) => {
            const progress = await UserSkillProgress.find({ userId: user._id });
            const avgScore = progress.length > 0
                ? Math.round(progress.reduce((sum, p) => sum + p.score, 0) / progress.length)
                : 0;

            const assessments = progress.reduce((sum, p) => sum + p.completedAssessments.length, 0);

            const lastActive = progress.length > 0
                ? progress.reduce((latest, p) =>
                    p.lastUpdated > latest ? p.lastUpdated : latest,
                    progress[0].lastUpdated
                )
                : user.createdAt;

            return {
                id: user._id,
                name: user.name || user.email,
                email: user.email,
                avgScore,
                assessments,
                lastActive: lastActive.toISOString().split('T')[0]
            };
        }));

        res.json(usersWithStats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed' });
    }
});

app.get('/api/admin/weakest-skills', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const allProgress = await UserSkillProgress.find().populate('skillId');

        // Group by skill and calculate average
        const skillMap = new Map();
        allProgress.forEach(p => {
            if (!p.skillId) return;
            const skillName = p.skillId.name;
            if (!skillMap.has(skillName)) {
                skillMap.set(skillName, { total: 0, count: 0 });
            }
            const data = skillMap.get(skillName);
            data.total += p.score;
            data.count += 1;
        });

        const weakestSkills = Array.from(skillMap.entries())
            .map(([skill, data]) => ({
                skill,
                avgScore: Math.round(data.total / data.count)
            }))
            .sort((a, b) => a.avgScore - b.avgScore)
            .slice(0, 5);

        res.json(weakestSkills);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'failed' });
    }
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`🚀 Backend running on port ${PORT}`);
    console.log(`📊 MongoDB: ${MONGODB_URI}`);
});
