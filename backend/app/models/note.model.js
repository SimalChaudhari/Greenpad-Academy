const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  name: {
    type: String,
    index: { unique: true }
  },
  description: String,
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  is_active: {
    type: Boolean,
    default: false
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
