const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skill_platform';

async function debug() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = 'test@example.com';
        const password = 'test123';

        console.log(`Searching for user: ${email}`);
        const user = await User.findOne({ email });

        if (!user) {
            console.log('❌ User not found');
            process.exit(0);
        }

        console.log('✅ User found');
        console.log('Password Hash in DB:', user.password_hash);

        const match = await bcrypt.compare(password, user.password_hash);
        if (match) {
            console.log('✅ Password matches!');
        } else {
            console.log('❌ Password DOES NOT match');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

debug();
