const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correctAnswer: {
        type: Number,
        required: true,
    },
    explanation: {
        type: String,
        required: false,
    },
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module", // Reference to the Module model
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const Exam = mongoose.model("Exam", ExamSchema);

module.exports = Exam;
