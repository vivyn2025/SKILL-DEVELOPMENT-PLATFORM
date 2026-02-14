const mongoose = require('mongoose');

const userSkillProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    skillId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
        required: true
    },
    currentLevel: {
        type: Number,
        min: 0,
        max: 10,
        default: 0
    },
    targetLevel: {
        type: Number,
        min: 1,
        max: 10,
        default: 8
    },
    score: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    completedAssessments: [{
        assessmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assessment'
        },
        score: Number,
        completedAt: {
            type: Date,
            default: Date.now
        }
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

// Compound index to ensure one progress per user per skill
userSkillProgressSchema.index({ userId: 1, skillId: 1 }, { unique: true });

module.exports = mongoose.model('UserSkillProgress', userSkillProgressSchema);
