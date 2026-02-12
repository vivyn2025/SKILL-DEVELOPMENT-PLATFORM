const http = require('http');

const BASE_URL = 'http://localhost:4000/api';
let token = '';
let userId = 0;
let courseId = 0;
let lessonId = 0;

async function request(method, path, body = null, auth = false) {
    return new Promise((resolve, reject) => {
        const headers = { 'Content-Type': 'application/json' };
        if (auth && token) headers['Authorization'] = `Bearer ${token}`;

        const req = http.request(BASE_URL + path, { method, headers }, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (res.statusCode >= 400) reject({ status: res.statusCode, error: json });
                    else resolve(json);
                } catch (e) {
                    reject({ status: res.statusCode, error: data });
                }
            });
        });

        req.on('error', reject);
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function run() {
    console.log('--- Starting Verification ---');

    try {
        // 1. Register
        console.log('1. Registering user...');
        const email = `test${Date.now()}@example.com`;
        const reg = await request('POST', '/auth/register', { email, password: 'password123' });
        token = reg.token;
        userId = reg.user.id;
        console.log('   User registered:', userId);

        // 2. Create Course (as same user, simplistic admin check)
        console.log('2. Creating Course...');
        const course = await request('POST', '/admin/courses', {
            title: 'Test Course',
            description: 'A course for testing',
            modules: [
                {
                    title: 'Module 1',
                    lessons: [
                        { title: 'Lesson 1', type: 'text', contentText: 'Hello World' },
                        { title: 'Lesson 2', type: 'video', contentUrl: 'https://youtube.com/watch?v=123' }
                    ]
                }
            ]
        }, true);
        courseId = course.id;
        console.log('   Course created:', courseId);

        // 3. Get Course Details
        console.log('3. Fetching Course Details...');
        const details = await request('GET', `/courses/${courseId}`);
        if (details.modules.length !== 1) throw new Error('Wrong module count');
        lessonId = details.modules[0].lessons[0].id;
        console.log('   Course verified. Lesson ID:', lessonId);

        // 4. Mark Lesson Complete
        console.log('4. Marking Lesson Complete...');
        await request('POST', '/progress', { lessonId, completed: true }, true);
        console.log('   Lesson marked complete.');

        // 5. Check Progress
        console.log('5. Checking Progress...');
        const progress = await request('GET', `/progress/${courseId}`, null, true);
        if (progress.length !== 1 || progress[0].lesson_id !== lessonId) throw new Error('Progress mismatch');
        console.log('   Progress verified.');

        console.log('--- Verification PASSED ---');
    } catch (err) {
        console.error('--- Verification FAILED ---');
        console.error(err);
        process.exit(1);
    }
}

run();
