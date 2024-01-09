const mongoose = require("mongoose");

// Define the roles using an enum
const rolesEnum = Object.freeze({
  ADMIN: "ADMIN",
  COMPANY: "COMPANY",
  EMPLOYEE: "EMPLOYEE"
});

const NoteSchema = new mongoose.Schema({
  note: String,
  tag: String,
  date_created: {
    type: Date,
    default: Date.now,
  },
  date_updated: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    first_name: String,
    last_name: String,
    job_title: String,
    department: String,
    company_name: String,
    email: {
      type: String,
      index: { unique: true }
    },
    password: String,
    reset_password_token: String,
    profession: String,
    address: String,
    country: String,
    post_code: String,
    token: String,
    image: String,
    role: {
      type: String, // Use String type for the role field
      enum: Object.values(rolesEnum), // Set the enum values
      default: rolesEnum.EMPLOYEE // Set a default role if necessary
    },
    is_active: {
      type: Boolean,
      default: true // Use true for the default value instead of 1
    },
    is_deleted: {
      type: Boolean,
      default: false // Use false for the default value instead of 0
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      default: null
    },
    courses: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      }],
      default: null,
    },
    module_progress: [{
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
      },
      coursemodule: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
      },
      is_completed: {
        type: Boolean,
        default: false,
      },
      notes: [NoteSchema], // Allow multiple notes for a module
    }],
  },{
    bufferTimeoutMS: 30000 // Increase the timeout (e.g., 30 seconds)
  })
);

module.exports = User;
