require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('./models/User');
const Skill = require('./models/Skill');
const Assessment = require('./models/Assessment');
const UserSkillProgress = require('./models/UserSkillProgress');
const LearningStep = require('./models/LearningStep');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skill_platform';

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Clear existing data
        console.log('Clearing existing data...');
        await User.deleteMany({});
        await Skill.deleteMany({});
        await Assessment.deleteMany({});
        await UserSkillProgress.deleteMany({});
        await LearningStep.deleteMany({});

        // Create Users
        console.log('Creating users...');
        const adminHash = await bcrypt.hash('admin123', 10);
        const testHash = await bcrypt.hash('test123', 10);

        const admin = await User.create({
            email: 'admin@example.com',
            password_hash: adminHash,
            name: 'Admin User',
            role: 'admin'
        });

        const testUser = await User.create({
            email: 'test@example.com',
            password_hash: testHash,
            name: 'Vivyn Kumar',
            role: 'student'
        });

        // Create Skills
        console.log('Creating skills...');
        const skills = await Skill.create([
            { name: 'JavaScript', category: 'Frontend', description: 'Modern JavaScript ES6+', difficulty: 6 },
            { name: 'React', category: 'Frontend', description: 'React library for UI', difficulty: 7 },
            { name: 'TypeScript', category: 'Frontend', description: 'Typed JavaScript', difficulty: 7 },
            { name: 'Node.js', category: 'Backend', description: 'Server-side JavaScript', difficulty: 6 },
            { name: 'Python', category: 'Backend', description: 'Python programming', difficulty: 5 },
            { name: 'SQL', category: 'Database', description: 'Database queries', difficulty: 5 },
            { name: 'Docker', category: 'DevOps', description: 'Containerization', difficulty: 8 },
            { name: 'AWS', category: 'Cloud', description: 'Amazon Web Services', difficulty: 9 }
        ]);

        // Create Assessments
        console.log('Creating assessments...');
        const assessments = await Assessment.create([
            {
                title: 'JavaScript Fundamentals',
                skillId: skills[0]._id,
                duration: 20,
                totalMarks: 100,
                questions: [
                    {
                        text: 'What is the output of typeof null in JavaScript?',
                        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
                        correctAnswer: 2
                    },
                    {
                        text: 'Which method is used to add elements to the end of an array?',
                        options: ['push()', 'pop()', 'shift()', 'unshift()'],
                        correctAnswer: 0
                    },
                    {
                        text: 'What does === operator check?',
                        options: ['Value only', 'Type only', 'Both value and type', 'Neither'],
                        correctAnswer: 2
                    },
                    {
                        text: 'Which keyword is used to declare a constant in JavaScript?',
                        options: ['var', 'let', 'const', 'static'],
                        correctAnswer: 2
                    },
                    {
                        text: 'What is a closure in JavaScript?',
                        options: [
                            'A function with no return value',
                            'A function that has access to outer scope',
                            'A loop inside a function',
                            'A function with multiple parameters'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'Which method converts a JSON string to a JavaScript object?',
                        options: ['JSON.parse()', 'JSON.stringify()', 'JSON.convert()', 'JSON.toObject()'],
                        correctAnswer: 0
                    },
                    {
                        text: 'What is the purpose of the "async" keyword?',
                        options: [
                            'Makes a function return a Promise',
                            'Makes a function run faster',
                            'Makes a function synchronous',
                            'Stops execution of code'
                        ],
                        correctAnswer: 0
                    },
                    {
                        text: 'Which array method creates a new array without modifying the original?',
                        options: ['splice()', 'push()', 'map()', 'sort()'],
                        correctAnswer: 2
                    },
                    {
                        text: 'What is event bubbling in JavaScript?',
                        options: [
                            'Events creating memory leaks',
                            'Events propagating from child to parent elements',
                            'Events being cancelled',
                            'Events running in parallel'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What does the spread operator (...) do?',
                        options: [
                            'Deletes elements',
                            'Expands an iterable into individual elements',
                            'Creates a loop',
                            'Defines a function'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'Which statement is true about "let" vs "var"?',
                        options: [
                            'let is function-scoped, var is block-scoped',
                            'let is block-scoped, var is function-scoped',
                            'They are exactly the same',
                            'let cannot be reassigned'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is the purpose of Promise.all()?',
                        options: [
                            'Runs promises sequentially',
                            'Waits for all promises to resolve',
                            'Cancels all promises',
                            'Returns the first resolved promise'
                        ],
                        correctAnswer: 1
                    }
                ]
            },
            {
                title: 'React Basics',
                skillId: skills[1]._id,
                duration: 20,
                totalMarks: 100,
                questions: [
                    {
                        text: 'Which hook is used for side effects in React?',
                        options: ['useState', 'useEffect', 'useRef', 'useMemo'],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is JSX?',
                        options: [
                            'A JavaScript library',
                            'A syntax extension for JavaScript',
                            'A CSS framework',
                            'A database'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'How do you pass data from parent to child component?',
                        options: ['State', 'Props', 'Context', 'Refs'],
                        correctAnswer: 1
                    },
                    {
                        text: 'What does useState return?',
                        options: [
                            'A single value',
                            'An array with value and setter',
                            'An object',
                            'A function'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'Which lifecycle method is called before a component unmounts?',
                        options: ['componentDidMount', 'componentWillUnmount', 'useEffect cleanup', 'render'],
                        correctAnswer: 2
                    },
                    {
                        text: 'What is the purpose of React.memo()?',
                        options: [
                            'To memorize user inputs',
                            'To prevent unnecessary re-renders',
                            'To save data to localStorage',
                            'To create memoized callbacks'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'When should you use useCallback?',
                        options: [
                            'To fetch data from API',
                            'To optimize function references between renders',
                            'To create state variables',
                            'To handle form submissions'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is the Virtual DOM?',
                        options: [
                            'An in-memory representation of the actual DOM',
                            'A CSS framework',
                            'A routing library',
                            'A state management tool'
                        ],
                        correctAnswer: 0
                    },
                    {
                        text: 'How do you handle forms in React?',
                        options: [
                            'Using refs only',
                            'Using controlled or uncontrolled components',
                            'React handles forms automatically',
                            'Forms are not supported in React'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is prop drilling?',
                        options: [
                            'Passing props through multiple component layers',
                            'Editing props directly',
                            'Removing unused props',
                            'Validating props'
                        ],
                        correctAnswer: 0
                    },
                    {
                        text: 'What does the key prop do in lists?',
                        options: [
                            'Encrypts the data',
                            'Helps React identify which items have changed',
                            'Sorts the list',
                            'Styles the list items'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is the Context API used for?',
                        options: [
                            'API calls',
                            'Sharing state across components without prop drilling',
                            'Styling components',
                            'Routing'
                        ],
                        correctAnswer: 1
                    }
                ]
            },
            {
                title: 'TypeScript Essentials',
                skillId: skills[2]._id,
                duration: 20,
                totalMarks: 100,
                questions: [
                    {
                        text: 'What does the "T" in TypeScript generics represent?',
                        options: ['Type parameter', 'Template', 'Token', 'Tuple'],
                        correctAnswer: 0
                    },
                    {
                        text: 'Which TypeScript type represents any value?',
                        options: ['null', 'undefined', 'any', 'unknown'],
                        correctAnswer: 2
                    },
                    {
                        text: 'How do you define an optional property in an interface?',
                        options: ['prop?', 'prop!', 'prop*', 'prop#'],
                        correctAnswer: 0
                    },
                    {
                        text: 'What is a tuple in TypeScript?',
                        options: [
                            'An object with fixed properties',
                            'An array with fixed length and types',
                            'A function type',
                            'A class'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'Which utility type makes all properties optional?',
                        options: ['Required', 'Partial', 'Pick', 'Omit'],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is type narrowing in TypeScript?',
                        options: [
                            'Making types smaller in size',
                            'Refining types within conditional blocks',
                            'Removing types from variables',
                            'Converting types to primitives'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is the "never" type used for?',
                        options: [
                            'Optional values',
                            'Functions that never return',
                            'Null values',
                            'Empty arrays'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is an enum in TypeScript?',
                        options: [
                            'A function type',
                            'A set of named constants',
                            'An array type',
                            'A class decorator'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What does the readonly modifier do?',
                        options: [
                            'Makes properties mutable',
                            'Prevents reassignment of properties',
                            'Hides properties',
                            'Deletes properties'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is type assertion in TypeScript?',
                        options: [
                            'Automatic type checking',
                            'Telling the compiler to trust your type knowledge',
                            'Creating new types',
                            'Deleting types'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is a union type?',
                        options: [
                            'Combining two classes',
                            'A type that can be one of several types',
                            'A database join',
                            'An array type'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What are decorators in TypeScript?',
                        options: [
                            'CSS styling functions',
                            'Functions that modify class/method behavior',
                            'Type validators',
                            'Import statements'
                        ],
                        correctAnswer: 1
                    }
                ]
            },
            {
                title: 'Node.js Backend',
                skillId: skills[3]._id,
                duration: 20,
                totalMarks: 100,
                questions: [
                    {
                        text: 'Which HTTP method is idempotent?',
                        options: ['POST', 'PATCH', 'PUT', 'None of the above'],
                        correctAnswer: 2
                    },
                    {
                        text: 'What is middleware in Express?',
                        options: [
                            'A database',
                            'Functions that process requests',
                            'A routing method',
                            'A template engine'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'Which module is used for file system operations?',
                        options: ['http', 'fs', 'path', 'os'],
                        correctAnswer: 1
                    },
                    {
                        text: 'What does npm stand for?',
                        options: [
                            'Node Package Manager',
                            'New Programming Method',
                            'Network Protocol Manager',
                            'Node Process Module'
                        ],
                        correctAnswer: 0
                    },
                    {
                        text: 'Which method starts an Express server?',
                        options: ['start()', 'listen()', 'run()', 'serve()'],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is the purpose of package.json?',
                        options: [
                            'To write JavaScript code',
                            'To manage project dependencies and metadata',
                            'To style the application',
                            'To test the code'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is event loop in Node.js?',
                        options: [
                            'A for loop',
                            'Mechanism that handles asynchronous operations',
                            'A database query',
                            'A routing library'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is the purpose of process.env?',
                        options: [
                            'To kill a process',
                            'To access environment variables',
                            'To create new processes',
                            'To debug code'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What does CORS stand for?',
                        options: [
                            'Cross-Origin Resource Sharing',
                            'Code Organization and Resource System',
                            'Client-Origin Request Security',
                            'Cross-Object Reference Standard'
                        ],
                        correctAnswer: 0
                    },
                    {
                        text: 'What is the purpose of async/await in Node.js?',
                        options: [
                            'To make code run faster',
                            'To handle asynchronous code more readably',
                            'To create multiple threads',
                            'To compress files'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is the difference between req.params and req.query?',
                        options: [
                            'They are the same',
                            'params are route parameters, query are query strings',
                            'params are for POST, query for GET',
                            'params are faster than query'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is bcrypt used for in Node.js?',
                        options: [
                            'Data compression',
                            'Password hashing',
                            'File encryption',
                            'API key generation'
                        ],
                        correctAnswer: 1
                    }
                ]
            },
            {
                title: 'Python Programming',
                skillId: skills[4]._id,
                duration: 20,
                totalMarks: 100,
                questions: [
                    {
                        text: 'What is the time complexity of binary search?',
                        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
                        correctAnswer: 1
                    },
                    {
                        text: 'Which data structure is LIFO?',
                        options: ['Queue', 'Stack', 'Array', 'Tree'],
                        correctAnswer: 1
                    },
                    {
                        text: 'What does "self" keyword represent in Python?',
                        options: [
                            'Global scope',
                            'Instance of class',
                            'Static method',
                            'Module'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'Which method is called when object is created?',
                        options: ['__init__', '__new__', '__create__', '__start__'],
                        correctAnswer: 0
                    },
                    {
                        text: 'What is list comprehension?',
                        options: [
                            'A way to loop through lists',
                            'A concise way to create lists',
                            'A sorting method',
                            'A type of function'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is a lambda function?',
                        options: [
                            'A named function',
                            'An anonymous one-line function',
                            'A class method',
                            'A module'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What does the "with" statement do?',
                        options: [
                            'Creates a loop',
                            'Ensures proper resource cleanup',
                            'Defines a function',
                            'Imports a module'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is the difference between append() and extend()?',
                        options: [
                            'They are the same',
                            'append adds one element, extend adds multiple',
                            'append is faster',
                            'extend works only with strings'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is a decorator in Python?',
                        options: [
                            'A comment',
                            'A function that modifies another function',
                            'A variable type',
                            'An import statement'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What does *args allow in a function?',
                        options: [
                            'No arguments',
                            'Variable number of positional arguments',
                            'Keyword arguments only',
                            'Type hints'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is the GIL in Python?',
                        options: [
                            'Graphics Integration Library',
                            'Global Interpreter Lock',
                            'Generic Interface Layer',
                            'Global Import List'
                        ],
                        correctAnswer: 1
                    },
                    {
                        text: 'What is the difference between == and is?',
                        options: [
                            'They are the same',
                            '== compares values, is compares identity',
                            '== is faster',
                            'is compares types only'
                        ],
                        correctAnswer: 1
                    }
                ]
            }
        ]);

        // Create User Progress for test user
        console.log('Creating user progress...');
        const progressData = [
            { skillId: skills[0]._id, currentLevel: 7, targetLevel: 9, score: 78 },
            { skillId: skills[1]._id, currentLevel: 6, targetLevel: 9, score: 67 },
            { skillId: skills[2]._id, currentLevel: 5, targetLevel: 8, score: 63 },
            { skillId: skills[3]._id, currentLevel: 4, targetLevel: 7, score: 57 },
            { skillId: skills[4]._id, currentLevel: 6, targetLevel: 8, score: 75 },
            { skillId: skills[5]._id, currentLevel: 7, targetLevel: 8, score: 88 },
            { skillId: skills[6]._id, currentLevel: 3, targetLevel: 7, score: 43 },
            { skillId: skills[7]._id, currentLevel: 2, targetLevel: 6, score: 33 }
        ];

        for (const data of progressData) {
            await UserSkillProgress.create({
                userId: testUser._id,
                ...data
            });
        }

        // Create Learning Steps
        console.log('Creating learning steps...');
        await LearningStep.create([
            {
                userId: testUser._id,
                skillName: 'AWS',
                priority: 'high',
                status: 'in-progress',
                description: 'Learn AWS core services: EC2, S3, Lambda',
                resources: ['AWS Docs', 'Udemy Course', 'A Cloud Guru']
            },
            {
                userId: testUser._id,
                skillName: 'Docker',
                priority: 'high',
                status: 'pending',
                description: 'Master containerization and Docker Compose',
                resources: ['Docker Docs', 'YouTube Series', 'Pluralsight']
            },
            {
                userId: testUser._id,
                skillName: 'Node.js',
                priority: 'medium',
                status: 'pending',
                description: 'Build REST APIs with Express.js',
                resources: ['Node.js Docs', 'FreeCodeCamp', 'MDN Web Docs']
            },
            {
                userId: testUser._id,
                skillName: 'TypeScript',
                priority: 'medium',
                status: 'completed',
                description: 'Advanced types, generics, and patterns',
                resources: ['TS Handbook', 'Type Challenges', 'Effective TypeScript']
            },
            {
                userId: testUser._id,
                skillName: 'React',
                priority: 'medium',
                status: 'in-progress',
                description: 'Advanced patterns, hooks, and performance',
                resources: ['React Docs', 'Epic React', 'Frontend Masters']
            },
            {
                userId: testUser._id,
                skillName: 'Python',
                priority: 'low',
                status: 'pending',
                description: 'Data structures and algorithm practice',
                resources: ['LeetCode', 'Python Docs', 'Real Python']
            }
        ]);

        console.log('✅ Seed completed successfully!');
        console.log('\n📊 Summary:');
        console.log(`   - Users: ${await User.countDocuments()}`);
        console.log(`   - Skills: ${await Skill.countDocuments()}`);
        console.log(`   - Assessments: ${await Assessment.countDocuments()}`);
        console.log(`   - Progress records: ${await UserSkillProgress.countDocuments()}`);
        console.log(`   - Learning steps: ${await LearningStep.countDocuments()}`);
        console.log('\n🔐 Test Credentials:');
        console.log('   Admin: admin@example.com / admin123');
        console.log('   Student: test@example.com / test123');

    } catch (err) {
        console.error('❌ Seed failed:', err);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
}

seed();
