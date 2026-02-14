# MongoDB Integration Guide

## Overview
This guide will help you migrate the SKILL platform from PostgreSQL to MongoDB with complete data setup.

## Prerequisites
- MongoDB installed locally OR MongoDB Atlas account
- Node.js and npm installed

## Step 1: Install MongoDB Dependencies

```bash
cd backend
npm install mongoose
```

## Step 2: MongoDB Connection Setup

Update `backend/.env` (create if doesn't exist):

```env
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/skill_platform

# OR MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/skill_platform

JWT_SECRET=your_secret_key_change_this_in_production
PORT=4000
```

## Step 3: Database Models

The following models will be created in `backend/models/`:

### User Model
- email (unique)
- password_hash
- name
- role (student/admin)
- createdAt

### Skill Model
- name
- category
- description
- difficulty (1-10)
- createdAt

### Assessment Model
- title
- skillId (reference)
- questions (array)
- duration (minutes)
- totalMarks

### UserSkillProgress Model
- userId (reference)
- skillId (reference)
- currentLevel (1-10)
- targetLevel (1-10)
- score (0-100)
- completedAssessments (array)
- lastUpdated

### LearningStep Model
- userId (reference)
- skillName
- priority (high/medium/low)
- status (pending/in-progress/completed)
- description
- resources (array)

## Step 4: API Endpoints Mapping

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/me` - Get current user info

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get skill by ID
- `POST /api/admin/skills` - Create skill (admin only)

### User Progress
- `GET /api/progress` - Get user's skill progress
- `POST /api/progress` - Update skill progress
- `GET /api/progress/gaps` - Get skill gaps

### Assessments
- `GET /api/assessments` - Get all assessments
- `GET /api/assessments/:id` - Get assessment by ID
- `POST /api/assessments/:id/submit` - Submit assessment answers

### Learning Path
- `GET /api/learning-path` - Get user's learning path
- `PUT /api/learning-path/:id` - Update learning step status

### Admin
- `GET /api/admin/stats` - Get platform statistics
- `GET /api/admin/users` - Get all users with performance
- `GET /api/admin/weakest-skills` - Get weakest skills across platform

## Step 5: Frontend Pages → API Mapping

| Page | Data Needed | API Endpoint |
|------|-------------|--------------|
| **Login** | Authentication | `POST /api/auth/login` |
| **Register** | User creation | `POST /api/auth/register` |
| **Dashboard** | Skills, Progress, Charts | `GET /api/skills`, `GET /api/progress` |
| **Assessment** | Questions | `GET /api/assessments/:id` |
| **Gap Analysis** | Skill gaps | `GET /api/progress/gaps` |
| **Learning Path** | Learning steps | `GET /api/learning-path` |
| **Admin** | Stats, Users, Analytics | `GET /api/admin/*` |

## Step 6: Sample Data

Sample data will be seeded including:
- 8 Skills (JavaScript, React, TypeScript, Node.js, Python, SQL, Docker, AWS)
- 5 Assessments with questions
- Admin user (admin@example.com / admin123)
- Test user (test@example.com / test123)

## Step 7: Running the Application

### Backend
```bash
cd backend
node index.js
# Server starts on http://localhost:4000
```

### Frontend
```bash
cd frontend
npm run dev
# Frontend starts on http://localhost:8080
```

### Test the Integration
1. Open http://localhost:8080
2. Register a new account or login with test@example.com / test123
3. Navigate to Dashboard to see skills
4. Complete an assessment
5. Check Gap Analysis
6. View Learning Path

## Next Steps
- Files will be generated in the next steps
- Run seed script to populate initial data
- Configure frontend API client
