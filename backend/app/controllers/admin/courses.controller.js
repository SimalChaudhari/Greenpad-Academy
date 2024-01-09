const db = require("../../models");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);
const Course = db.Course;
const Module = db.Module;

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { name, description, level, fees, duration } = req.body;

    // Validate the required fields
    if (!name || !description || !level || !fees || !duration) {
      return res.status(400).json({ message: "All Fields Are Required!" });
    }

    const course = new Course({
      name,
      description,
      level,
      fees,
      duration,
      is_active: true,
      created_by: req.userId,
      updated_by: req.userId,
    });

    // Check if an image file was uploaded
    if (req.files) {
      const imageFile = req.files?.image;
      if (imageFile) {
        const relativeUploadsPath = "../../../uploads";

        // Define the full path where the image will be saved
        const fullPath = path.join(
          __dirname,
          relativeUploadsPath,
          Date.now() + "-" + imageFile.name
        );

        // Calculate the relative imagePath
        const imagePath = path.relative(process.cwd(), fullPath);
        const concatenatedImagePath = "..\\..\\..\\" + imagePath;

        await writeFileAsync(imagePath, imageFile.data); // Save the file to disk

        course.image = concatenatedImagePath; // Set the image path in the course object
      }
    }

    await course.save();

    res
      .status(201)
      .json({ message: "Course Created Successfully!", data: course });
  } catch (err) {
    console.log("err: ", err);
    res.status(500).json({ message: err.message });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const courses = await Course.findById(courseId);

    const { name, description, level, fees, duration } = req.body;

    // Validate the required fields
    if (!name || !description || !level || !fees || !duration) {
      return res.status(400).json({ message: "All Fields Are Required!" });
    }

    let course = await Course.findById(courseId);
    console.log('course: ', course);

    if (!course) {
      return res.status(404).json({ message: "Course Not Found!" });
    }
    // Check if an image file was uploaded
    if (req.files) {
      const imageFile = req.files?.image;
      if (imageFile) {
        const relativeUploadsPath = "../../../uploads";

        // Define the full path where the image will be saved
        const fullPath = path.join(
          __dirname,
          relativeUploadsPath,
          Date.now() + "-" + imageFile.name
        );

        // Calculate the relative imagePath
        const imagePath = path.relative(process.cwd(), fullPath);
        const concatenatedImagePath = "..\\..\\..\\" + imagePath;

        await writeFileAsync(imagePath, imageFile.data); // Save the file to disk

        const oldImagePath = path.join(__dirname, courses.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete the old image file
        } else {
          console.log(`File Not Found At Path: ${oldImagePath}`);
        }

        course.image = concatenatedImagePath; // Update the image path in the course object
      }
    }

    course.name = name;
    course.description = description;
    course.level = level;
    course.fees = fees;
    course.duration = duration;
    course.updated_by = req.userId;
    course.updated_at = Date.now();

    console.log('course: ', course);
    await course.save();

    res.json({ message: "Course Updated Successfully!", data: course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    let course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course Not Nound!" });
    }

    // Check if the course has associated modules
    if (course.modules.length > 0) {
      return res
        .status(400)
        .json({ message: "First Delete Associated Modules!" });
    }

    const oldImagePath = path.join(__dirname, course.image);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath); // Delete the old image file
    } else {
      console.log(`File Not Found At Path: ${oldImagePath}`);
    }
    await course.remove();

    res.json({ message: "Course Deleted Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a list of courses
exports.getCourseList = async (req, res) => {
  try {
    const courses = await Course.find();

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
      path: "modules",
      populate: {
        path: "descriptions",
        model: "Description",
      },
    });

    if (!course) {
      return res.status(404).json({ message: "Course Not Found!" });
    }

    res.json({ data: course });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a course Module
exports.updateCourseModule = async (req, res) => {
  try {
    const courseId = req.params.id;

    const { module_title, CourseModuleId } = req.body;

    // Validate the required fields
    if (!module_title) {
      return res.status(400).json({ message: "All Fields Are Required!" });
    }

    let course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course Not Found!" });
    }

    // Find the module with the specified CourseModuleId in the course's modules array
    const moduleToUpdate = course.modules.find(
      (module) => module._id.toString() === CourseModuleId
    );

    if (!moduleToUpdate) {
      return res.status(404).json({ message: "Module Not Found!" });
    }

    // Update the module_title of the found module
    moduleToUpdate.module_title = module_title;
    moduleToUpdate.date_updated = new Date();

    await course.save();

    res.json({ message: "Course Module Updated Successfully!", data: course });
    // res.json({ message: "Course Updated Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a course Module
exports.deleteCourseModule = async (req, res) => {
  try {
    const courseModuleId = req.params.id;
    const { CourseModuleId } = req.body;
    const CourseId = CourseModuleId;

    let course = await Course.findById(CourseId);
    // console.log('course: ', course);

    if (!course) {
      return res.status(404).json({ message: "Course Not Found!" });
    }
    const moduleList = course.modules.filter(module => module._id.toString() === courseModuleId);


    if(moduleList[0].module.length > 0){
      return res.status(404).json({ message: "First Delete Associated Course Modules!" });
    }
 
    // Find the index of the module with the specified CourseModuleId in the course's modules array
    const moduleIndex = course.modules.findIndex(
      (module) => module._id.toString() === courseModuleId
      );

    if (moduleIndex === -1) {
      return res.status(404).json({ message: "Module Not Found!" });
    }

    // Remove the module from the modules array
    course.modules.splice(moduleIndex, 1);

    // Save the updated course to persist the deletion
    await course.save();

    res.json({ message: "Course Module Deleted Successfully!", data: course });
    // res.json({ message: "Course Module Deleted Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a course Module
exports.addCourseModule = async (req, res) => {
  try {
    const CourseId = req.params.id;
    const { module_title } = req.body;

    let course = await Course.findById(CourseId);

    if (!course) {
      return res.status(404).json({ message: "Course Not Found!" });
    }

    const newModule = {
      module_title: module_title,
      date_created: new Date(),
      date_updated: new Date(),
      module: [],
    };

    // Push the new module to the course's modules array
    course.modules.push(newModule);

    // Save the updated course to persist the deletion
    await course.save();

    res.json({ message: "Course Module Deleted Successfully!", data: course });
    // res.json({ message: "Course Module Added Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
