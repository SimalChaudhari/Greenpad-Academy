const db = require("../../models");
const fs = require('fs');
const { promisify } = require('util');
const Course = db.Course;
const User = db.User;
const Module = db.Module;
const Description = db.Description;

// Get a list of courses
exports.getCourseList = async (req, res) => {
  const id = req.userId;
  try {
    const user = await User.findById(id);
    const courseIds = user.courses;
    // const courses = await Course.find({ _id: { $in: courseIds } }).populate('modules');

    const courses = await Course.find({ _id: { $in: courseIds } })
      .populate({
        path: 'modules.module',
        populate: {
          path: 'descriptions',
          model: Description,
        },
      });
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
      path: 'modules.module',
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

// Update the module progress for employee and retrieve module progress for a specific course
exports.updateProgress = async (req, res) => {
  try {
    const { descriptionId, courseId, moduleId, subModuleId } = req.body.data;

    // Find the user by their ID
    const user = await User.findById(req.user.id); // Assuming you have the user in req.user
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the index of the module progress in the user's module_progress array
    const moduleIndex = user.module_progress.findIndex(item =>
      item?.description?.equals(descriptionId) && item.course.equals(courseId)
    );

    // If module progress is found
    if (moduleIndex !== -1) {
      // Update the is_completed field for the module
      user.module_progress[moduleIndex].is_completed = true; // Set to true or false as needed

      // Save the updated user data
      await user.save();

      // Filter the module progress for the specific course
      const moduleProgressForCourse = user.module_progress.filter(item =>
        item.course && item.course.equals(courseId)
      );

      // Send the updated module progress for the course in the response
      res.status(200).json({ message: 'Module Progress Updated Successfully', moduleProgressForCourse });
    } else {
      // If module progress is not found, create a new one and mark it as completed
      const newModuleProgress = {
        course: courseId,
        module: moduleId,
        description: descriptionId,
        subModule: subModuleId, // Ensure this is what you intend to save
        is_completed: true, // Set to true or false as needed
        notes: [] // Initialize an empty array for notes
      };

      user.module_progress.push(newModuleProgress);

      // Save the updated user data
      await user.save();

      // Filter the module_progress array to include only entries matching the given courseId
      const moduleProgressForCourse = user.module_progress.filter(item =>
        item.course && item.course.equals(courseId)
      );

      // Send the updated module progress for the course in the response
      res.status(201).json({ message: 'New Module Progress Created And Marked As Completed', moduleProgressForCourse });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Retrieve module progress for a specific course
exports.getModuleProgressForCourse = async (req, res) => {
  try {
    const courseId = req.params.id; // Assuming you have courseId as a route parameter

    // Find the user by their ID
    const user = await User.findById(req.user.id); // Assuming you have the user in req.user

    // Filter the module_progress array to include only entries matching the given courseId
    // const moduleProgressForCourse = user.module_progress.filter(item => {
    //         // Check if item.course is valid and not null
    //   if (item.coursemodule && item.coursemodule.equals(courseId)) {
    //     return true;
    //   }
    //   return false;
    // });

    const moduleProgressForCourse = user.module_progress.filter(item => {
      // Check if item.course is valid and not null
      if (item.course && item.course.equals(courseId)) {
        return true;
      }
      return false;
    });

    res.status(200).json(moduleProgressForCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Retrieve all module progress for a specific course
exports.getAllModuleProgressForCourse = async (req, res) => {
  try {

    // Find the user by their ID
    const user = await User.findById(req.user.id); // Assuming you have the user in req.user

    // Filter the module_progress array to include only entries matching the given courseId
    const moduleProgressForCourse = user?.module_progress;

    res.status(200).json(moduleProgressForCourse);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Profile
exports.updatedProfile = async (req, res) => {
  try {
    let profileId = req.params.id;
    let updatedData = req.body;

    // Fetch user data
    let user = await User.findById(profileId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found." });
    }

    // Module ID to search for
    let moduleIdToSearch = updatedData.module;
    let courseId = updatedData.course;

    if (moduleIdToSearch === "") {
      return res.status(404).json({ message: "Module Not Found." });
    } else {
      // Find the module_progress entry with the specified module ID
      let moduleProgressEntry = user.module_progress.find(
        (entry) => entry.module.toString() == moduleIdToSearch
      );

      if (!moduleProgressEntry) {

        AddToText = updatedData.notes;
        AddToTag = updatedData.tag;

        moduleProgressEntry = {
          // is_completed: true,
          course: courseId,
          module: moduleIdToSearch,
          notes: [{ tag: AddToTag, note: AddToText, date_created: new Date(), date_updated: new Date() }],
        };

        user.module_progress.push(moduleProgressEntry);

        await user.save();

        return res.status(200).json({ message: "Module Notes Updated Successfully.", moduleProgressEntry });

      } else {

        AddText = updatedData.notes;
        AddTag = updatedData.tag;

        const newNotes = [{ tag: AddTag, note: AddText, date_created: new Date(), date_updated: new Date() }];

        // Push the new notes to the moduleProgressEntry.notes array
        moduleProgressEntry.notes.push(...newNotes);

        // Save the updated user data
        await user.save();

        // Return the updated module progress entry
        return res.status(200).json({ message: "Module Notes Updated Successfully.", moduleProgressEntry });
      }

    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Notes
exports.updatedNotes = async (req, res) => {
  try {
    const userId = req.user.id; // Assume the user ID is retrieved from the authenticated user
    const descriptionId = req.params.id; // Description ID passed in the request parameters
    const { notes, courseId, moduleId, subModuleId } = req.body; // Notes passed in the request body

    if (!notes) {
      return res.status(400).json({ message: "Note content is required" });
    }

    // Find the user by ID
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the module_progress entry with the matching description ID
    let progress = user.module_progress.find(
      (progress) => progress.description.toString() === descriptionId
    );
    if (progress) {
      // If the progress exists for the descriptionId, update the notes array
      progress.notes = [
        {
          note: notes,
          tag: "",
          date_updated: Date.now(),
        },
      ];

    } else {
      // If no matching progress exists, create a new entry in module_progress
      user.module_progress.push({
        course: courseId || null, // Set the courseId if available, else null
        module: moduleId || null, // Set the moduleId if available, else null
        subModule: subModuleId || null, // Set the subModuleId if available, else null
        description: descriptionId, // Set the descriptionId
        is_completed: false, // Optional: Default is_completed to false since the module is not completed yet
        notes: [
          {
            note: notes,
            tag: "",
            date_created: Date.now(),
            date_updated: Date.now(),
          },
        ],
      });
    }

    // Save the user with updated or added module progress
    await user.save();

    // Send success response
    res.status(200).json({ message: "Notes updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Profile for updateNoteProfile
exports.updateNoteProfile = async (req, res) => {
  try {
    const updatedData = req.body;
    const userId = req.userId;
    const noteIdToUpdate = updatedData?._id;

    const updatedNote = {
      ...updatedData,
    };

    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found." });
    }

    // Find the course and module index containing the note to be updated
    let courseIndex, moduleIndex, noteIndex;

    for (courseIndex in user.module_progress) {
      for (moduleIndex in user.module_progress[courseIndex].notes) {
        noteIndex = user.module_progress[courseIndex].notes.findIndex(
          (note) => note._id.toString() === noteIdToUpdate
        );

        if (noteIndex !== -1) {
          // Note found, update its properties
          user.module_progress[courseIndex].notes[noteIndex] = {
            ...user.module_progress[courseIndex].notes[noteIndex],
            ...updatedNote,
          };
          break;
        }
      }
      if (noteIndex !== -1) {
        // Note found, break from the outer loop as well
        break;
      }
    }

    // Save the updated user data
    await user.save();

    res.status(201).json({ message: 'Update note successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Update Profile for deleteNoteProfile
exports.deleteNoteProfile = async (req, res) => {
  try {
    const noteIdToDelete = req.body?.data?._id;

    const userId = req.userId;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User Not Found." });
    }

    // Find the course and module index containing the note to be deleted
    let courseIndex, moduleIndex, noteIndex;

    for (courseIndex in user.module_progress) {
      for (moduleIndex in user.module_progress[courseIndex].notes) {
        noteIndex = user.module_progress[courseIndex].notes.findIndex(
          (note) => note._id.toString() === noteIdToDelete
        );

        if (noteIndex !== -1) {
          // Note found, remove it
          user.module_progress[courseIndex].notes.splice(noteIndex, 1);
          break;
        }
      }
      if (noteIndex !== -1) {
        // Note found, break from the outer loop as well
        break;
      }
    }

    // Save the updated user data
    await user.save();

    res.status(201).json({ message: 'Delete note successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
