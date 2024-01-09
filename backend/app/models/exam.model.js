const mongoose = require("mongoose");

const Exam = mongoose.model(
  "Exam",
  new mongoose.Schema({
    grade: String,
    feedback: String,
    course_id: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }],
    is_active: {
      type: Boolean,
      default: false
    },
    is_deleted: {
      type: Boolean,
      default: false
    },
    user_id: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    exam_date: {
      type: Date,
      default: Date.now
    }
  })
);

module.exports = Exam;
