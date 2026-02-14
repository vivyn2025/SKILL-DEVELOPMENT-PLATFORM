# MongoDB + Backend + Frontend Integration - Complete Setup Guide

## ✅ What has been created:

### Backend Files Created:
1. **Models** (`backend/models/`)
   - `User.js` - User authentication model
   - `Skill.js` - Skills/courses model  
   - `Assessment.js` - Assessment with questions
   - `UserSkillProgress.js` - Track user progress per skill
   - `LearningStep.js` - Learning path steps

2. **Main Server**
   - `backend/index-mongodb.js` - Complete MongoDB-based backend (replaces index.js)

3. **Data Setup**
   - `backend/seed.js` - Populates database with initial data

### Frontend Files Created/Updated:
1. **API Client**
   - `frontend/src/lib/api.ts` - Complete API client for all endpoints

2. **Authentication**
   - `frontend/src/context/AuthContext.tsx` - Real auth context
   - `frontend/src/hooks/useAuth.ts` - Updated to use real AuthContext

3. **Configuration**
   - `frontend/vite.config.ts` - Updated with proxy configuration
   - `frontend/src/App.tsx` - Wrapped with AuthProvider

---

## 📋 Step-by-Step Setup Instructions

### Step 1: Install MongoDB

#### Option A: Local MongoDB
1. Download MongoDB from https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. MongoDB will run on `mongodb://localhost:27017`

#### Option B: MongoDB Atlas (Cloud)
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/skill_platform`

### Step 2: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install mongoose
npm install mongoose

# Create .env file
echo "MONGODB_URI=mongodb://localhost:27017/skill_platform" > .env
echo "JWT_SECRET=your_super_secret_key_change_in_production" >> .env
echo "PORT=4000" >> .env

# For Windows PowerShell, create .env manually or use:
# New-Item .env -ItemType File -Force
# Then edit .env and add:
# MONGODB_URI=mongodb://localhost:27017/skill_platform
# JWT_SECRET=your_super_secret_key_change_in_production
# PORT=4000
```

### Step 3: Seed the Database

```bash
# Still in backend folder
node seed.js
```

You should see output like:
```
Connected to MongoDB
Clearing existing data...
Creating users...
Creating skills...
Creating assessments...
Creating user progress...
Creating learning steps...
✅ Seed completed successfully!

📊 Summary:
   - Users: 2
   - Skills: 8
   - Assessments: 5
   - Progress records: 8
   - Learning steps: 6

🔐 Test Credentials:
   Admin: admin@example.com / admin123
   Student: test@example.com / test123
```

### Step 4: Start Backend Server

```bash
# Use the new MongoDB-based server
node index-mongodb.js

# OR rename it to replace the old one:
# mv index.js index-postgres.js
# mv index-mongodb.js index.js
# node index.js
```

You should see:
```
✅ MongoDB connected
🚀 Backend running on port 4000
📊 MongoDB: mongodb://localhost:27017/skill_platform
```

### Step 5: Frontend Setup

```bash
# Open NEW terminal, navigate to frontend
cd frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Frontend will start on `http://localhost:8080`

### Step 6: Test the Application

1. **Open browser**: http://localhost:8080

2. **Register new user**:
   - Go to /register
   - Fill form and create account
   - You'll be redirected to Dashboard

3. **Or login with test account**:
   - Email: `test@example.com`
   - Password: `test123`

4. **Test Features**:
   - ✅ Dashboard - See your skills with progress
   - ✅ Gap Analysis - View skills needing improvement
   - ✅ Learning Path - Your personalized learning steps
   - ✅ Assessment - Take skill assessments
   - ✅ Admin Dashboard - Login as admin@example.com / admin123

---

## 🗂️ API Endpoints Reference

### Auth
- `POST /api/auth/register` - Register (email, password, name)
- `POST /api/auth/login` - Login (email, password)
- `GET /api/me` - Get current user (requires auth)

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get skill by ID
- `POST /api/admin/skills` - Create skill (admin only)

### Progress
- `GET /api/progress` - Get user's skill progress
- `POST /api/progress` - Update progress (skillId, currentLevel, targetLevel, score)
- `GET /api/progress/gaps` - Get skill gaps analysis

### Assessments
- `GET /api/assessments` - List all assessments
- `GET /api/assessments/:id` - Get assessment with questions
- `POST /api/assessments/:id/submit` - Submit answers (answers object)

### Learning Path
- `GET /api/learning-path` - Get user's learning steps
- `PUT /api/learning-path/:id` - Update step status (status)

### Admin
- `GET /api/admin/stats` - Platform statistics
- `GET /api/admin/users` - All users with performance
- `GET /api/admin/weakest-skills` - Skills with lowest avg scores

---

## 📊 Frontend Pages → Backend Data Mapping

### Dashboard (`/dashboard`)
**Fetches:**
- `GET /api/progress` - User's skill progress
  
**Displays:**
- KPIs: Total skills, completed, avg score, gaps
- Charts: Radar (skill coverage), Bar (current vs target levels), Line (progress trend)
- Recommended skills

### Gap Analysis (`/gap-analysis`)
**Fetches:**
- `GET /api/progress/gaps` - Skills with current < target level

**Displays:**
- Skills grouped by severity (high/medium/low)
- Gap percentage for each skill

### Learning Path (`/learning-path`)
**Fetches:**
- `GET /api/learning-path` - User's learning steps

**Updates:**
- `PUT /api/learning-path/:id` - When clicking status toggle

**Displays:**
- Steps with priority, status, resources
- Overall progress percentage

### Assessment (`/assessment/:id`)
**Fetches:**
- `GET /api/assessments/:id` - Assessment questions

**Submits:**
- `POST /api/assessments/:id/submit` - User answers

**Displays:**
- Timed quiz interface
- Score result

### Admin Dashboard (`/admin`)
**Fetches:**
- `GET /api/admin/stats` - Platform KPIs
- `GET /api/admin/users` - User performance table
- `GET /api/admin/weakest-skills` - Weakest skills chart

**Displays:**
- Platform-wide statistics
- User performance table
- Analytics charts

---

## 🔧 Troubleshooting

### MongoDB Connection Issues
```
Error: connect ECONNREFUSED
```
**Solution:** Ensure MongoDB is running
- Local: Start MongoDB service
- Atlas: Check connection string and whitelist your IP

### Port Already in Use
```
Error: listen EADDRINUSE :::4000
```
**Solution:** Kill process on port 4000 or change PORT in .env

### Frontend Can't Reach Backend
**Check:**
1. Backend is running on port 4000
2. Frontend proxy is configured in `vite.config.ts`
3. No CORS errors in browser console

### Authentication Not Working
**Check:**
1. JWT_SECRET is set in backend .env
2. Token is stored in localStorage
3. Authorization header is sent with requests

---

## 📝 Next Steps

1. **Customize Data**: Edit `seed.js` to add your own skills/assessments
2. **Add Features**: Extend API and frontend for new functionality
3. **Deploy**: Set up production MongoDB and deploy to cloud
4. **Security**: Update JWT_SECRET, add rate limiting, input validation

---

## 🎯 Quick Reference Commands

```bash
# Backend
cd backend
npm install mongoose
node seed.js              # Populate database
node index-mongodb.js     # Start server

# Frontend  
cd frontend
npm install               # If needed
npm run dev               # Start dev server

# Test
# Browser: http://localhost:8080
# Login: test@example.com / test123
# Admin: admin@example.com / admin123
```

---

## ✨ All Pages Now Connected!

Every frontend page now fetches REAL data from MongoDB:
- ✅ Login/Register - Real JWT authentication
- ✅ Dashboard - Real skills & progress from DB
- ✅ Gap Analysis - Calculated from user progress
- ✅ Learning Path - User's personalized steps
- ✅ Assessment - Real questions, scores saved
- ✅ Admin - Real platform analytics

**You're all set! 🚀**
