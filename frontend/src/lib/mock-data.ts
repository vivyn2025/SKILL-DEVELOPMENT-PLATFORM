import { Skill, GapSkill, LearningStep, Question, Assessment } from '@/types';

export const mockSkills: Skill[] = [
  { id: '1', name: 'JavaScript', category: 'Frontend', currentLevel: 7, targetLevel: 9, score: 78 },
  { id: '2', name: 'React', category: 'Frontend', currentLevel: 6, targetLevel: 9, score: 67 },
  { id: '3', name: 'TypeScript', category: 'Frontend', currentLevel: 5, targetLevel: 8, score: 63 },
  { id: '4', name: 'Node.js', category: 'Backend', currentLevel: 4, targetLevel: 7, score: 57 },
  { id: '5', name: 'Python', category: 'Backend', currentLevel: 6, targetLevel: 8, score: 75 },
  { id: '6', name: 'SQL', category: 'Database', currentLevel: 7, targetLevel: 8, score: 88 },
  { id: '7', name: 'Docker', category: 'DevOps', currentLevel: 3, targetLevel: 7, score: 43 },
  { id: '8', name: 'AWS', category: 'Cloud', currentLevel: 2, targetLevel: 6, score: 33 },
];

export const mockGapSkills: GapSkill[] = [
  {
    id: '1', name: 'Docker', currentLevel: 3, targetLevel: 7, gapPercentage: 57, severity: 'high',
    prerequisites: [
      { topic: 'Linux Command Line Basics', description: 'Understanding file system navigation, permissions, and shell commands is essential for working with Docker containers.', importance: 'essential' },
      { topic: 'Networking Fundamentals', description: 'Know TCP/IP, ports, DNS, and HTTP — Docker relies heavily on network configuration.', importance: 'essential' },
      { topic: 'Virtual Machines vs Containers', description: 'Understand the difference between VMs and containers to grasp why Docker is efficient.', importance: 'recommended' },
      { topic: 'YAML Syntax', description: 'Docker Compose files use YAML. Being comfortable reading and writing YAML helps a lot.', importance: 'helpful' },
    ],
  },
  {
    id: '2', name: 'AWS', currentLevel: 2, targetLevel: 6, gapPercentage: 67, severity: 'high',
    prerequisites: [
      { topic: 'Cloud Computing Concepts', description: 'Understand IaaS, PaaS, SaaS models and how cloud differs from on‑premise infrastructure.', importance: 'essential' },
      { topic: 'Networking & DNS', description: 'Know how IP addresses, subnets, load balancers, and DNS work before configuring AWS VPCs.', importance: 'essential' },
      { topic: 'Linux Server Administration', description: 'Most AWS instances run Linux. Basic sysadmin skills are needed for EC2 management.', importance: 'recommended' },
      { topic: 'REST API Basics', description: 'Many AWS services are accessed via APIs. Understanding REST and HTTP methods is helpful.', importance: 'helpful' },
    ],
  },
  {
    id: '3', name: 'Node.js', currentLevel: 4, targetLevel: 7, gapPercentage: 43, severity: 'medium',
    prerequisites: [
      { topic: 'JavaScript ES6+ Fundamentals', description: 'Arrow functions, destructuring, promises, and async/await are the foundation of Node.js code.', importance: 'essential' },
      { topic: 'How the Event Loop Works', description: 'Node.js is single‑threaded and event-driven. Understanding the event loop prevents blocking bugs.', importance: 'essential' },
      { topic: 'HTTP Protocol', description: 'Know request/response cycle, status codes, and headers to build web servers effectively.', importance: 'recommended' },
      { topic: 'npm & Package Management', description: 'Understanding package.json, versioning, and dependency management is key for Node projects.', importance: 'recommended' },
    ],
  },
  {
    id: '4', name: 'TypeScript', currentLevel: 5, targetLevel: 8, gapPercentage: 38, severity: 'medium',
    prerequisites: [
      { topic: 'JavaScript Proficiency', description: 'TypeScript builds on JavaScript. Strong JS knowledge (closures, prototypes, modules) is a must.', importance: 'essential' },
      { topic: 'Object-Oriented Programming', description: 'Concepts like classes, interfaces, inheritance, and polymorphism transfer directly to TypeScript.', importance: 'recommended' },
      { topic: 'Static vs Dynamic Typing', description: 'Understand the benefits and trade-offs of type systems to appreciate what TS offers.', importance: 'helpful' },
    ],
  },
  {
    id: '5', name: 'React', currentLevel: 6, targetLevel: 9, gapPercentage: 33, severity: 'medium',
    prerequisites: [
      { topic: 'HTML & CSS Mastery', description: 'React renders HTML. Understanding semantic HTML, CSS layout (flexbox, grid), and responsive design is critical.', importance: 'essential' },
      { topic: 'JavaScript ES6+', description: 'JSX, hooks, and state management all rely on modern JavaScript features.', importance: 'essential' },
      { topic: 'DOM Manipulation Concepts', description: 'Knowing how the browser DOM works helps you understand React\'s virtual DOM optimization.', importance: 'recommended' },
      { topic: 'Component‑Based Architecture', description: 'Understanding reusable, composable UI patterns will accelerate your React learning.', importance: 'helpful' },
    ],
  },
  {
    id: '6', name: 'JavaScript', currentLevel: 7, targetLevel: 9, gapPercentage: 22, severity: 'low',
    prerequisites: [
      { topic: 'Basic Programming Logic', description: 'Variables, loops, conditionals, and functions form the base of all JavaScript code.', importance: 'essential' },
      { topic: 'HTML & Browser Basics', description: 'JavaScript runs inside the browser. Knowing HTML structure and browser DevTools is important.', importance: 'recommended' },
      { topic: 'Data Structures Overview', description: 'Arrays, objects, maps, and sets are used everywhere in JavaScript. Have a mental model of each.', importance: 'helpful' },
    ],
  },
  {
    id: '7', name: 'Python', currentLevel: 6, targetLevel: 8, gapPercentage: 25, severity: 'low',
    prerequisites: [
      { topic: 'Programming Fundamentals', description: 'Control flow, functions, and basic data types are needed before diving into Python.', importance: 'essential' },
      { topic: 'Understanding Data Structures', description: 'Lists, dictionaries, tuples, and sets are core to Python — know how and when to use each.', importance: 'recommended' },
      { topic: 'Command Line Basics', description: 'Running Python scripts, pip installs, and virtual environments all happen in the terminal.', importance: 'helpful' },
    ],
  },
  {
    id: '8', name: 'SQL', currentLevel: 7, targetLevel: 8, gapPercentage: 13, severity: 'low',
    prerequisites: [
      { topic: 'Relational Database Concepts', description: 'Tables, rows, columns, primary keys, and foreign keys — the building blocks of SQL databases.', importance: 'essential' },
      { topic: 'Data Normalization', description: 'Understanding 1NF, 2NF, 3NF helps you design efficient, non‑redundant database schemas.', importance: 'recommended' },
      { topic: 'Basic Set Theory', description: 'SQL JOINs and filtering are based on set operations. A conceptual understanding speeds up learning.', importance: 'helpful' },
    ],
  },
];

export const mockLearningSteps: LearningStep[] = [
  { id: '1', skillName: 'AWS', priority: 'high', status: 'in-progress', description: 'Learn AWS core services: EC2, S3, Lambda', resources: ['AWS Docs', 'Udemy Course'] },
  { id: '2', skillName: 'Docker', priority: 'high', status: 'pending', description: 'Master containerization and Docker Compose', resources: ['Docker Docs', 'YouTube Series'] },
  { id: '3', skillName: 'Node.js', priority: 'medium', status: 'pending', description: 'Build REST APIs with Express.js', resources: ['Node.js Docs', 'FreeCodeCamp'] },
  { id: '4', skillName: 'TypeScript', priority: 'medium', status: 'completed', description: 'Advanced types, generics, and patterns', resources: ['TS Handbook', 'Type Challenges'] },
  { id: '5', skillName: 'React', priority: 'medium', status: 'in-progress', description: 'Advanced patterns, hooks, and performance', resources: ['React Docs', 'Epic React'] },
  { id: '6', skillName: 'Python', priority: 'low', status: 'pending', description: 'Data structures and algorithm practice', resources: ['LeetCode', 'Python Docs'] },
];

export const mockQuestions: Question[] = [
  { id: '1', text: 'What is the output of typeof null in JavaScript?', options: ['"null"', '"undefined"', '"object"', '"boolean"'], correctAnswer: 2 },
  { id: '2', text: 'Which hook is used for side effects in React?', options: ['useState', 'useEffect', 'useRef', 'useMemo'], correctAnswer: 1 },
  { id: '3', text: 'What does the "T" in TypeScript generics represent?', options: ['Type parameter', 'Template', 'Token', 'Tuple'], correctAnswer: 0 },
  { id: '4', text: 'Which HTTP method is idempotent?', options: ['POST', 'PATCH', 'PUT', 'None of the above'], correctAnswer: 2 },
  { id: '5', text: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctAnswer: 1 },
];

export const mockAssessment: Assessment = {
  id: '1',
  title: 'JavaScript Fundamentals',
  skillId: '1',
  questions: mockQuestions,
  duration: 15,
  totalMarks: 50,
};

export const progressData = [
  { month: 'Jan', score: 45 },
  { month: 'Feb', score: 52 },
  { month: 'Mar', score: 58 },
  { month: 'Apr', score: 63 },
  { month: 'May', score: 71 },
  { month: 'Jun', score: 78 },
];

export const radarData = [
  { skill: 'JavaScript', value: 78, fullMark: 100 },
  { skill: 'React', value: 67, fullMark: 100 },
  { skill: 'TypeScript', value: 63, fullMark: 100 },
  { skill: 'Node.js', value: 57, fullMark: 100 },
  { skill: 'Python', value: 75, fullMark: 100 },
  { skill: 'SQL', value: 88, fullMark: 100 },
  { skill: 'Docker', value: 43, fullMark: 100 },
  { skill: 'AWS', value: 33, fullMark: 100 },
];

export const adminUserData = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', avgScore: 82, assessments: 12, lastActive: '2026-02-10' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', avgScore: 74, assessments: 8, lastActive: '2026-02-11' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com', avgScore: 91, assessments: 15, lastActive: '2026-02-12' },
  { id: '4', name: 'Dan Wilson', email: 'dan@example.com', avgScore: 56, assessments: 5, lastActive: '2026-02-09' },
  { id: '5', name: 'Eva Martinez', email: 'eva@example.com', avgScore: 68, assessments: 10, lastActive: '2026-02-11' },
];

export const weakestSkillsData = [
  { skill: 'AWS', avgScore: 33 },
  { skill: 'Docker', avgScore: 43 },
  { skill: 'Node.js', avgScore: 57 },
  { skill: 'TypeScript', avgScore: 63 },
  { skill: 'React', avgScore: 67 },
];
