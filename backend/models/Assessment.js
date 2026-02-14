const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: String,
    options: [String],
    correctAnswer: Number // index of correct option
});

const assessmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    skillId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill',
        required: true
    },
    questions: [questionSchema],
    duration: {
        type: Number, // minutes
        default: 15
    },
    totalMarks: {
        type: Number,
        default: 50
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Assessment', assessmentSchema);
