# SKILL Platform Architecture - MongoDB Integration

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND (React + Vite)                        │
│                        http://localhost:8080                             │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTP Requests
                                    │ (with JWT token in header)
                                    │
                            ┌───────▼────────┐
                            │  Vite Proxy    │
                            │  /api → :4000  │
                            └───────┬────────┘
                                    │
┌─────────────────────────────────────────────────────────────────────────┐
│                        BACKEND (Express + Mongoose)                      │
│                          http://localhost:4000                           │
│                                                                          │
│  ┌────────────────────┐                                                 │
│  │  Auth Middleware   │  ← Verifies JWT token                          │
│  └────────────────────┘                                                 │
│           │                                                              │
│  ┌────────▼─────────────────────────────────────────────────────────┐  │
│  │                      API Routes                                   │  │
│  │                                                                   │  │
│  │  /api/auth/*          → Login, Register, Get Me                 │  │
│  │  /api/skills/*        → Get Skills, Create Skill (admin)        │  │
│  │  /api/progress/*      → Get Progress, Update, Get Gaps          │  │
│  │  /api/assessments/*   → Get Assessment, Submit Answers          │  │
│  │  /api/learning-path/* → Get Steps, Update Status                │  │
│  │  /api/admin/*         → Stats, Users, Analytics (admin)         │  │
│  │                                                                   │  │
│  └───────────────────────────────┬──────────────────────────────────┘  │
│                                   │                                      │
│                                   │ Mongoose Models                      │
│                                   │                                      │
│  ┌────────────────────────────────▼──────────────────────────────────┐ │
│  │                        Mongoose ODM                                │ │
│  │                                                                    │ │
│  │  User              → email, password_hash, role                   │ │
│  │  Skill             → name, category, difficulty                   │ │
│  │  Assessment        → title, skillId, questions[]                  │ │
│  │  UserSkillProgress → userId, skillId, currentLevel, score         │ │
│  │  LearningStep      → userId, skillName, status, priority          │ │
│  │                                                                    │ │
│  └────────────────────────────────┬──────────────────────────────────┘ │
│                                    │                                     │
└────────────────────────────────────┼─────────────────────────────────────┘
                                     │
                                     │ MongoDB Driver
                                     │
┌────────────────────────────────────▼─────────────────────────────────────┐
│                        MongoDB Database                                  │
│                   mongodb://localhost:27017/skill_platform               │
│                                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐               │
│  │   users      │  │   skills     │  │  assessments    │               │
│  │              │  │              │  │                 │               │
│  │  • admin     │  │  • JavaScript│  │  • JS Quiz      │               │
│  │  • test user │  │  • React     │  │  • React Quiz   │               │
│  │              │  │  • TypeScript│  │  • TS Quiz      │               │
│  │              │  │  • Node.js   │  │  • Node Quiz    │               │
│  │              │  │  • Python    │  │  • Python Quiz  │               │
│  │              │  │  • SQL       │  │                 │               │
│  │              │  │  • Docker    │  │                 │               │
│  │              │  │  • AWS       │  │                 │               │
│  └──────────────┘  └──────────────┘  └─────────────────┘               │
│                                                                          │
│  ┌──────────────────────┐  ┌─────────────────┐                         │
│  │ userskillprogresses  │  │ learningsteps   │                         │
│  │                      │  │                 │                         │
│  │  8 progress records  │  │  6 steps for    │                         │
│  │  for test user       │  │  test user      │                         │
│  │                      │  │                 │                         │
│  └──────────────────────┘  └─────────────────┘                         │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘


═══════════════════════════════════════════════════════════════════════════
                          REQUEST FLOW EXAMPLES
═══════════════════════════════════════════════════════════════════════════

Example 1: User Login
─────────────────────

1. User fills login form
   └─→ Frontend: POST /api/auth/login { email, password }

2. Vite proxy forwards to backend
   └─→ Backend: http://localhost:4000/api/auth/login

3. Backend finds user in MongoDB
   └─→ MongoDB: users.findOne({ email })

4. Backend verifies password (bcrypt)
   └─→ Compares hash

5. Backend generates JWT
   └─→ jwt.sign({ userId, role }, JWT_SECRET)

6. Backend responds
   └─→ { token, user: { id, email, name, role } }

7. Frontend stores token
   └─→ localStorage.setItem('token', token)
   └─→ AuthContext updates user state

8. Frontend redirects
   └─→ navigate('/dashboard')


Example 2: Viewing Dashboard
────────────────────────────

1. Dashboard component mounts
   └─→ useQuery({ queryFn: progress.getAll })

2. API client makes request
   └─→ GET /api/progress
   └─→ Headers: { Authorization: 'Bearer <token>' }

3. Backend auth middleware
   └─→ Extracts token from header
   └─→ Verifies JWT → userId

4. Backend queries MongoDB
   └─→ UserSkillProgress.find({ userId })
   └─→ .populate('skillId')

5. Backend transforms data
   └─→ Maps to frontend format:
       { id, name, category, currentLevel, targetLevel, score }

6. Backend responds
   └─→ Array of skill progress objects

7. Frontend displays data
   └─→ KPIs calculated from progress
   └─→ Charts rendered from data
   └─→ Recommended skills filtered


Example 3: Taking Assessment
───────────────────────────

1. User navigates to /assessment/:id
   └─→ useQuery({ queryFn: assessments.getById(id) })

2. Backend fetches assessment
   └─→ Assessment.findById(id).populate('skillId')

3. Frontend displays questions
   └─→ User selects answers
   └─→ Timer counts down

4. User submits
   └─→ POST /api/assessments/:id/submit
   └─→ Body: { answers: { 0: 2, 1: 1, ... } }

5. Backend calculates score
   └─→ Compare answers to correctAnswer
   └─→ score = (correct / total) * 100

6. Backend updates progress
   └─→ UserSkillProgress.findOne({ userId, skillId })
   └─→ Push to completedAssessments
   └─→ Update overall score (average)
   └─→ Level up if score >= 80%

7. Backend responds
   └─→ { correct, total, score }

8. Frontend shows result
   └─→ Display score percentage
   └─→ Celebrate completion


Example 4: Gap Analysis
──────────────────────

1. User visits /gap-analysis
   └─→ useQuery({ queryFn: progress.getGaps })

2. Backend gets user progress
   └─→ UserSkillProgress.find({ userId }).populate('skillId')

3. Backend calculates gaps
   └─→ Filter: currentLevel < targetLevel
   └─→ For each: 
       gapPercentage = ((target - current) / target) * 100
       severity = gap >= 50 ? 'high' : gap >= 30 ? 'medium' : 'low'

4. Backend sorts by gap
   └─→ Sort descending by gapPercentage

5. Backend responds
   └─→ Array of gaps with severity

6 Frontend groups by severity
   └─→ highGap = filter(severity === 'high')
   └─→ medGap = filter(severity === 'medium')
   └─→ lowGap = filter(severity === 'low')

7. Frontend displays
   └─→ Three sections with color coding
   └─→ Skills sorted by urgency


═══════════════════════════════════════════════════════════════════════════
                          AUTHENTICATION FLOW
═══════════════════════════════════════════════════════════════════════════

┌──────────┐                                         ┌──────────┐
│ Frontend │                                         │ Backend  │
└────┬─────┘                                         └────┬─────┘
     │                                                     │
     │  1. POST /api/auth/login                          │
     │     { email, password }                            │
     ├───────────────────────────────────────────────────►│
     │                                                     │
     │                            2. Find user in MongoDB │
     │                            3. Verify password hash │
     │                            4. Generate JWT token   │
     │                                                     │
     │  5. { token, user }                                │
     │◄───────────────────────────────────────────────────┤
     │                                                     │
     │  6. Store token in localStorage                    │
     │  7. Update AuthContext state                       │
     │                                                     │
     │  8. All future requests:                           │
     │     Headers: { Authorization: 'Bearer <token>' }   │
     ├───────────────────────────────────────────────────►│
     │                                                     │
     │                            9. Verify token         │
     │                           10. Extract userId       │
     │                           11. Attach to request    │
     │                           12. Process request      │
     │                                                     │
     │  13. Response data                                 │
     │◄───────────────────────────────────────────────────┤
     │                                                     │
     ▼                                                     ▼


═══════════════════════════════════════════════════════════════════════════
                        TECHNOLOGY STACK
═══════════════════════════════════════════════════════════════════════════

Frontend:
  ├─ React 18
  ├─ TypeScript
  ├─ Vite (dev server)
  ├─ TanStack Query (data fetching)
  ├─ React Router (routing)
  ├─ Tailwind CSS (styling)
  ├─ shadcn/ui (components)
  └─ Framer Motion (animations)

Backend:
  ├─ Node.js
  ├─ Express
  ├─ Mongoose (MongoDB ODM)
  ├─ JWT (authentication)
  ├─ bcrypt (password hashing)
  └─ CORS (cross-origin requests)

Database:
  ├─ MongoDB
  └─ 5 Collections:
      ├─ users
      ├─ skills
      ├─ assessments
      ├─ userskillprogresses
      └─ learningsteps


═══════════════════════════════════════════════════════════════════════════
                         FILE STRUCTURE
═══════════════════════════════════════════════════════════════════════════

SKILL/
│
├── backend/
│   ├── models/                   # Mongoose Schemas
│   │   ├── User.js              # User model
│   │   ├── Skill.js             # Skill model
│   │   ├── Assessment.js        # Assessment model
│   │   ├── UserSkillProgress.js # Progress tracking
│   │   └── LearningStep.js      # Learning path
│   │
│   ├── index-mongodb.js         # 🔥 Main MongoDB Server
│   ├── seed.js                  # 🔥 Database seeding
│   ├── package.json             # Dependencies (mongoose added)
│   └── .env                     # Environment variables
│
├── frontend/
│   └── src/
│       ├── lib/
│       │   └── api.ts           # 🔥 API Client
│       │
│       ├── context/
│       │   └── AuthContext.tsx  # 🔥 Real Authentication
│       │
│       ├── hooks/
│       │   └── useAuth.ts       # Updated to use AuthContext
│       │
│       ├── pages/               # All connected to real APIs
│       │   ├── Login.tsx        # Uses /api/auth/login
│       │   ├── Register.tsx     # Uses /api/auth/register
│       │   ├── Dashboard.tsx    # Uses /api/progress
│       │   ├── GapAnalysis.tsx  # Uses /api/progress/gaps
│       │   ├── LearningPath.tsx # Uses /api/learning-path
│       │   ├── Assessment.tsx   # Uses /api/assessments
│       │   └── Admin.tsx        # Uses /api/admin/*
│       │
│       ├── App.tsx              # 🔥 Wrapped with AuthProvider
│       └── vite.config.ts       # 🔥 Added proxy config
│
└── Documentation/
    ├── SETUP_GUIDE.md           # Complete setup steps
    ├── API_MAPPING.md           # Detailed API docs
    ├── INTEGRATION_SUMMARY.md   # Overview
    ├── QUICK_REFERENCE.md       # Quick ref card
    └── ARCHITECTURE.md          # This file

🔥 = New or significantly modified file


═══════════════════════════════════════════════════════════════════════════
                    READY TO USE! 🚀
═══════════════════════════════════════════════════════════════════════════

Quick Start:
  1. cd backend && npm install mongoose
  2. node seed.js
  3. node index-mongodb.js

  4. cd frontend && npm install
  5. npm run dev

  6. Open http://localhost:8080
  7. Login: test@example.com / test123

All frontend pages now fetch real data from MongoDB! ✨
```
