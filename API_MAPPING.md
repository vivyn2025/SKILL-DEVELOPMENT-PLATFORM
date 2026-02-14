# Frontend Pages → Backend API Mapping

## Complete Data Flow Documentation

---

## 1. **Index Page** (`/`)
**Type:** Landing Page  
**Authentication:** Not Required

### API Calls: NONE
- Static marketing page
- No backend data needed

---

## 2. **Login Page** (`/login`)
**Type:** Authentication  
**Authentication:** Not Required

### API Calls:
```typescript
POST /api/auth/login
Body: { email: string, password: string }
Response: { 
  token: string,
  user: { id, email, name, role }
}
```

### Frontend Implementation:
```typescript
// Located in: src/pages/Login.tsx
import { useAuth } from '@/hooks/useAuth';

const handleLogin = async () => {
  await login(email, password); // Calls auth.login() from api.ts
  navigate('/dashboard');
};
```

### Data Storage:
- Token saved to `localStorage.setItem('token', ...)`
- User stored in AuthContext state

---

## 3. **Register Page** (`/register`)
**Type:** Authentication  
**Authentication:** Not Required

### API Calls:
```typescript
POST /api/auth/register
Body: { email: string, password: string, name?: string }
Response: {
  token: string,
  user: { id, email, name, role }
}
```

### Frontend Implementation:
```typescript
// Located in: src/pages/Register.tsx
import { useAuth } from '@/hooks/useAuth';

const handleRegister = async () => {
  await register(name, email, password); // Calls auth.register() from api.ts
  navigate('/dashboard');
};
```

---

## 4. **Dashboard Page** (`/dashboard`)
**Type:** Main Dashboard  
**Authentication:** Required

### API Calls:
```typescript
GET /api/progress
Headers: { Authorization: 'Bearer <token>' }
Response: [
  {
    id: string,
    name: string,
    category: string,
    currentLevel: number (0-10),
    targetLevel: number (1-10),
    score: number (0-100)
  },
  ...
]
```

### Frontend Implementation:
```typescript
// Located in: src/pages/Dashboard.tsx
import { useQuery } from '@tanstack/react-query';
import { progress } from '@/lib/api';

const { data: skillsProgress } = useQuery({
  queryKey: ['progress'],
  queryFn: progress.getAll
});

// Transform data for charts
const barData = skillsProgress.map(s => ({
  name: s.name,
  current: s.currentLevel,
  target: s.targetLevel
}));
```

### Data Displayed:
- **KPIs:**
  - Total Skills: `skillsProgress.length`
  - Completed: `filter(s => s.currentLevel >= s.targetLevel).length`
  - Avg Score: `average of all scores`
  - Gap Skills: `total - completed`

- **Charts:**
  - Radar Chart: Skill coverage by score
  - Bar Chart: Current vs Target levels
  - Line Chart: Progress trend (mock for now)

- **Recommended Skills:**
  - Filter: `currentLevel < targetLevel`
  - Display: Top 3 skills needing improvement

---

## 5. **Gap Analysis Page** (`/gap-analysis`)
**Type:** Analysis Dashboard  
**Authentication:** Required

### API Calls:
```typescript
GET /api/progress/gaps
Headers: { Authorization: 'Bearer <token>' }
Response: [
  {
    id: string,
    name: string,
    currentLevel: number,
    targetLevel: number,
    gapPercentage: number,
    severity: 'high' | 'medium' | 'low'
  },
  ...
]
```

### Frontend Implementation:
```typescript
// Located in: src/pages/GapAnalysis.tsx
import { useQuery } from '@tanstack/react-query';
import { progress } from '@/lib/api';

const { data: gaps } = useQuery({
  queryKey: ['gaps'],
  queryFn: progress.getGaps
});

const highGap = gaps?.filter(s => s.severity === 'high') || [];
const medGap = gaps?.filter(s => s.severity === 'medium') || [];
const lowGap = gaps?.filter(s => s.severity === 'low') || [];
```

### Data Displayed:
- Skills grouped by severity
- Each skill shows gap percentage
- Visual indicators for urgency

### Gap Calculation (Backend):
```javascript
gapPercentage = ((targetLevel - currentLevel) / targetLevel) * 100
severity = gapPercentage >= 50 ? 'high' : gapPercentage >= 30 ? 'medium' : 'low'
```

---

## 6. **Learning Path Page** (`/learning-path`)
**Type:** Interactive Roadmap  
**Authentication:** Required

### API Calls:

#### Get Learning Steps:
```typescript
GET /api/learning-path
Headers: { Authorization: 'Bearer <token>' }
Response: [
  {
    _id: string,
    userId: string,
    skillName: string,
    priority: 'high' | 'medium' | 'low',
    status: 'pending' | 'in-progress' | 'completed',
    description: string,
    resources: string[]
  },
  ...
]
```

#### Update Step Status:
```typescript
PUT /api/learning-path/:id
Headers: { Authorization: 'Bearer <token>' }
Body: { status: 'pending' | 'in-progress' | 'completed' }
Response: { updated learning step }
```

### Frontend Implementation:
```typescript
// Located in: src/pages/LearningPath.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { learningPath } from '@/lib/api';

// Fetch steps
const { data: steps } = useQuery({
  queryKey: ['learningPath'],
  queryFn: learningPath.getAll
});

// Update status mutation
const updateMutation = useMutation({
  mutationFn: ({ id, status }) => learningPath.updateStatus(id, status),
  onSuccess: () => {
    queryClient.invalidateQueries(['learningPath']);
  }
});

const toggleStatus = (id: string) => {
  const step = steps.find(s => s.id === id);
  const nextStatus = statusCycle[step.status]; // pending -> in-progress -> completed -> pending
  updateMutation.mutate({ id, status: nextStatus });
};
```

### Data Displayed:
- Timeline of learning steps
- Progress bar (completed / total)
- Status indicators with icons
- Priority badges
- Clickable resources

---

## 7. **Assessment Page** (`/assessment/:id`)
**Type:** Interactive Quiz  
**Authentication:** Required

### API Calls:

#### Get Assessment:
```typescript
GET /api/assessments/:id
Headers: { Authorization: 'Bearer <token>' }
Response: {
  _id: string,
  title: string,
  skillId: { _id, name, category },
  duration: number,
  totalMarks: number,
  questions: [
    {
      text: string,
      options: string[],
      correctAnswer: number // index
    },
    ...
  ]
}
```

#### Submit Assessment:
```typescript
POST /api/assessments/:id/submit
Headers: { Authorization: 'Bearer <token>' }
Body: {
  answers: {
    0: 2,  // questionIndex: selectedOptionIndex
    1: 1,
    ...
  }
}
Response: {
  correct: number,
  total: number,
  score: number // percentage
}
```

### Frontend Implementation:
```typescript
// Located in: src/pages/Assessment.tsx
import { useQuery, useMutation } from '@tanstack/react-query';
import { assessments } from '@/lib/api';
import { useParams } from 'react-router-dom';

const { id } = useParams();

// Fetch assessment
const { data: assessment } = useQuery({
  queryKey: ['assessment', id],
  queryFn: () => assessments.getById(id!)
});

// Submit mutation
const submitMutation = useMutation({
  mutationFn: (answers) => assessments.submit(id!, answers),
  onSuccess: (result) => {
    setSubmitted(true);
    toast({ title: `Score: ${result.score}%` });
  }
});
```

### Features:
- Timer countdown
- Question navigation
- Answer selection
- Submit confirmation modal
- Score display on completion

### Backend Behavior:
- Calculates score
- Updates UserSkillProgress:
  - Adds to completedAssessments array
  - Updates overall score (average)
  - Auto-increments currentLevel if score >= 80%

---

## 8. **Admin Dashboard** (`/admin`)
**Type:** Analytics Dashboard  
**Authentication:** Required (Admin Only)

### API Calls:

#### Platform Statistics:
```typescript
GET /api/admin/stats
Headers: { Authorization: 'Bearer <token>' }
Response: {
  totalUsers: number,
  totalAssessments: number,
  averageScore: number,
  activeUsers: number // updated in last 7 days
}
```

#### User Performance:
```typescript
GET /api/admin/users
Headers: { Authorization: 'Bearer <token>' }
Response: [
  {
    id: string,
    name: string,
    email: string,
    avgScore: number,
    assessments: number, // total completed
    lastActive: string // YYYY-MM-DD
  },
  ...
]
```

#### Weakest Skills:
```typescript
GET /api/admin/weakest-skills
Headers: { Authorization: 'Bearer <token>' }
Response: [
  {
    skill: string,
    avgScore: number
  },
  ...
] // sorted by avgScore ascending, top 5
```

### Frontend Implementation:
```typescript
// Located in: src/pages/Admin.tsx
import { useQuery } from '@tanstack/react-query';
import { admin } from '@/lib/api';

const { data: stats } = useQuery({
  queryKey: ['adminStats'],
  queryFn: admin.getStats
});

const { data: users } = useQuery({
  queryKey: ['adminUsers'],
  queryFn: admin.getUsers
});

const { data: weakestSkills } = useQuery({
  queryKey: ['weakestSkills'],
  queryFn: admin.getWeakestSkills
});
```

### Data Displayed:
- **KPIs:** Total users, assessments, avg score, active users
- **Charts:**
  - Weakest skills bar chart (horizontal)
  - Platform performance trend
- **Table:** User list with scores, assessments, last active

---

## 📊 Data Models Reference

### User Progress Model (MongoDB)
```javascript
{
  userId: ObjectId,
  skillId: ObjectId,
  currentLevel: 0-10,
  targetLevel: 1-10,
  score: 0-100,
  completedAssessments: [
    { assessmentId, score, completedAt }
  ],
  lastUpdated: Date
}
```

### Assessment Submission Flow
1. User completes assessment → Frontend sends answers
2. Backend calculates correct count
3. Backend updates UserSkillProgress:
   - Append to completedAssessments
   - Recalculate overall score (average)
   - Increment currentLevel if score >= 80%
4. Frontend shows result

### Authentication Flow
1. User logs in → Backend verifies credentials
2. Backend generates JWT with `{ userId, role }`
3. Frontend stores token and user data
4. All subsequent requests include `Authorization: Bearer <token>`
5. Backend middleware verifies token and attaches userId to request

---

## 🔗 Quick API Summary

| Page | GET | POST | PUT |
|------|-----|------|-----|
| Login | - | /api/auth/login | - |
| Register | - | /api/auth/register | - |
| Dashboard | /api/progress | - | - |
| Gap Analysis | /api/progress/gaps | - | - |
| Learning Path | /api/learning-path | - | /api/learning-path/:id |
| Assessment | /api/assessments/:id | /api/assessments/:id/submit | - |
| Admin | /api/admin/stats, /api/admin/users, /api/admin/weakest-skills | - | - |

---

## 🎯 State Management

### React Query Cache Keys:
- `['progress']` - User skill progress
- `['gaps']` - Skill gaps
- `['learningPath']` - Learning steps
- `['assessment', id]` - Assessment by ID
- `['adminStats']` - Admin statistics
- `['adminUsers']` - All users performance
- `['weakestSkills']` - Weakest skills data

### LocalStorage:
- `token` - JWT authentication token

### AuthContext State:
- `user` - Current user object
- `isLoading` - Auth initialization status

---

**All pages are now fully integrated with MongoDB backend! 🚀**
