const db = require("../models");

const Course = db.course;

// * Add Course

exports.addCourse = (req, res) => {
  const {
    name,
    description,
    level,
    fees,
    duration,
    is_active,
    created_by,
    updated_by,
  } = req.body;

  try {
    const course = new Course({
      name,
      description,
      level,
      fees,
      duration,
      is_active,
      created_by,
      updated_by,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    course.save((err, course) => {
      if (err) {
        if (err.code === 11000) {
          return res.status(500).json({ message: "Course already exist!" });
        } else {
          return res.status(500).json({ message: err });
        }
      }

      res.status(200).json({ message: "Course created successfully!", course });
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create the course.", error: err });
  }
};

// * Update Course

exports.updateCourse = async (req, res) => {
  const courseId = req.params.id;
  const { name, description, level, fees, duration, is_active, updated_by } =
    req.body;

  try {
    const course = await Course.findById(courseId);

    if (!course) { return res.status(404).json({ message: "Course not found." }); }

    course.name = name;
    course.description = description;
    course.level = level;
    course.fees = fees;
    course.duration = duration;
    course.is_active = is_active;
    course.updated_by = updated_by;
    course.update_at = Date.now();

    await course.save();
    res.status(200).json({ message: "Course updated successfully.", course });
    //return response object with status code and success message
  } catch (err) {
    if (err.code === 11000) {
      res.status(500).json({ message: "Course already exist!" });
    } else {
      res.status(500).json({ message: "Failed to update the course.", error: err });
    }
  }
};

// * Remove Course

exports.removeCourse = async (req, res) => {
  const courseId = req.params.id;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    await course.remove();
    res.status(200).json({ message: "Course deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete the course.", error: err });
  }
};
