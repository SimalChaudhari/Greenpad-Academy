const db = require("../../models");
const fs = require('fs');
const { promisify } = require('util');
const Course = db.Course;
const User = db.User;

// Get a list of courses
exports.getCourseList = async (req, res) => {

  try {
    const user = await User.findById(req.userId); 
    const courseIds = user.courses;
    const courses = await Course.find({ _id: { $in: courseIds } });

    res.json({ data: courses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

};

// Get a course by ID
exports.getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId).populate({
      path: 'modules',
      populate: {
        path: 'descriptions',
        model: 'Description'
      }
    });

    if (!course) {
      return res.status(404).json({ message: "Course Not Found!" });
    }

    res.json({ data: course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
