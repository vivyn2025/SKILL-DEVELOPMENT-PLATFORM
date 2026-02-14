const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skill_platform';

async function check() {
    await mongoose.connect(MONGODB_URI);
    const user = await User.findOne({ email: 'test@example.com' });
    console.log('User test@example.com:', user);
    process.exit(0);
}

check();
