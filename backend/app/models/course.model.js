const mongoose = require("mongoose");
const Module = require("./Module.model");


const ModuleSchema = new mongoose.Schema({
  module_title: String,
  module: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    default: null,
  }],
  date_created: {
    type: Date,
    default: Date.now,
  },
  date_updated: {
    type: Date,
    default: Date.now,
  },
});

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    index: { unique: true },
    required: true
  },
  description: {
    type: String,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  fees: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    default: false
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  image: {
    type: String,
    required: true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  modules: [ModuleSchema], // Allow multiple modules for a module
  // modules: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Module'
  // }]
});

CourseSchema.pre('validate', async function (next) {
  try {
    // Check if the created_by user has the ADMIN role
    const User = mongoose.model('User');
    const createdByUser = await User.findById(this.created_by);
    if (createdByUser.role !== 'ADMIN') {
      throw new Error('The course can only be created by a user with the ADMIN role.');
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
