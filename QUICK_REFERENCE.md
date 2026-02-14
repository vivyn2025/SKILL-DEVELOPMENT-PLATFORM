# Quick Reference Card - SKILL Platform MongoDB Integration

## 🚀 Quick Start (3 Commands)

### Terminal 1 - Backend:
```bash
cd backend
npm install mongoose
node seed.js
node index-mongodb.js
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm install
npm run dev
```

### Open Browser:
```
http://localhost:8080
Login: test@example.com / test123
```

---

## 📋 MongoDB Connection Strings

### Local:
```
mongodb://localhost:27017/skill_platform
```

### Atlas (Cloud):
```
mongodb+srv://username:password@cluster.mongodb.net/skill_platform
```

---

## 🔑 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Student | test@example.com | test123 |
| Admin | admin@example.com | admin123 |

---

## 📡 API Endpoints Quick Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Register new user |
| POST | /api/auth/login | No | Login |
| GET | /api/me | Yes | Get current user |
| GET | /api/skills | No | Get all skills |
| GET | /api/progress | Yes | Get user progress |
| GET | /api/progress/gaps | Yes | Get skill gaps |
| GET | /api/assessments/:id | Yes | Get assessment |
| POST | /api/assessments/:id/submit | Yes | Submit assessment |
| GET | /api/learning-path | Yes | Get learning steps |
| PUT | /api/learning-path/:id | Yes | Update step status |
| GET | /api/admin/stats | Admin | Platform stats |
| GET | /api/admin/users | Admin | All users |

---

## 📁 Key Files

### Backend:
- `index-mongodb.js` - Main server
- `seed.js` - Database seeding
- `models/` - Mongoose schemas

### Frontend:
- `src/lib/api.ts` - API client
- `src/context/AuthContext.tsx` - Auth provider
- `src/App.tsx` - Main app with AuthProvider

### Docs:
- `SETUP_GUIDE.md` - Full setup instructions
- `API_MAPPING.md` - Detailed API docs
- `INTEGRATION_SUMMARY.md` - Complete overview

---

## 🐛 Common Issues

### "MongoDB connection refused"
**Fix:** Start MongoDB service
```bash
# Windows: MongoDB should auto-start
# Check in Services or Task Manager

# Mac/Linux:
sudo systemctl start mongod
```

### "Port 4000 already in use"
**Fix:** Kill process or change port
```bash
# Windows PowerShell:
Get-Process -Id (GetNetTCPConnection -LocalPort 4000).OwningProcess | Stop-Process

# Or edit .env:
PORT=5000
```

### "Cannot find module 'mongoose'"
**Fix:** Install dependencies
```bash
cd backend
npm install mongoose
```

### Frontend TypeScript errors
**Fix:** Install dependencies
```bash
cd frontend
npm install
```

---

## 📊 Sample Data Included

- **8 Skills**: JavaScript, React, TypeScript, Node.js, Python, SQL, Docker, AWS
- **5 Assessments**: 25 questions total
- **2 Users**: Admin + Test student
- **8 Progress Records**: Test user's skill levels
- **6 Learning Steps**: Personalized roadmap

---

## 🎯 Frontend Pages

| Page | URL | Data Source |
|------|-----|-------------|
| Landing | / | Static |
| Login | /login | POST /api/auth/login |
| Register | /register | POST /api/auth/register |
| Dashboard | /dashboard | GET /api/progress |
| Gap Analysis | /gap-analysis | GET /api/progress/gaps |
| Learning Path | /learning-path | GET /api/learning-path |
| Assessment | /assessment/:id | GET /api/assessments/:id |
| Admin | /admin | GET /api/admin/* |

---

## 💾 MongoDB Collections

| Collection | Documents | Purpose |
|------------|-----------|---------|
| users | 2 | Authentication |
| skills | 8 | Skill catalog |
| assessments | 5 | Quizzes |
| userskillprogresses | 8 | User progress tracking |
| learningsteps | 6 | Learning paths |

---

## 🔐 Authentication Flow

1. User submits credentials → `POST /api/auth/login`
2. Backend validates → Returns JWT token
3. Frontend stores token → `localStorage.setItem('token', ...)`
4. All requests include → `Authorization: Bearer <token>`
5. Backend verifies token → Attaches userId to request

---

## 📈 Progress Tracking

### Assessment Submission:
1. User completes quiz
2. Frontend sends answers
3. Backend calculates score
4. Updates UserSkillProgress:
   - Add to completedAssessments
   - Update average score
   - Level up if score >= 80%

### Gap Calculation:
```javascript
gap% = ((target - current) / target) * 100
severity = gap >= 50% ? 'high' : gap >= 30% ? 'medium' : 'low'
```

---

## 🛠️ Development Commands

### Backend:
```bash
npm run start        # Run with PostgreSQL
npm run start:mongo  # Run with MongoDB
npm run dev          # Dev with PostgreSQL + nodemon
npm run dev:mongo    # Dev with MongoDB + nodemon
npm run seed         # Seed MongoDB database
```

### Frontend:
```bash
npm run dev          # Start dev server (port 8080)
npm run build        # Build for production
npm run preview      # Preview production build
```

---

## 🌐 URLs

- **Frontend:** http://localhost:8080
- **Backend:** http://localhost:4000
- **API:** http://localhost:4000/api/*

---

## ✅ Checklist

- [ ] MongoDB installed and running
- [ ] Backend dependencies installed (`npm install`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] `.env` file created in backend
- [ ] Database seeded (`node seed.js`)
- [ ] Backend running (`node index-mongodb.js`)
- [ ] Frontend running (`npm run dev`)
- [ ] Can login at http://localhost:8080

---

**For detailed information, see:**
- `SETUP_GUIDE.md`
- `API_MAPPING.md`
- `INTEGRATION_SUMMARY.md`
