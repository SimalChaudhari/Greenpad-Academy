const db = require("../../models");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

const Employee = db.User;

// Get Profile By Id
exports.getById = async (req, res) => {
  try {
    const profileId = req.params.id;

    const user = await Employee.findById(profileId);

    if (user) {
      res.status(200).json({
        data: user,
        message: "Retrieved Profile Details Successfully!",
      });
    } else {
      res.status(404).json({ message: "User Not Found." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Update Profile
exports.update = async (req, res) => {
  try {
    const updatedData = req.body;
    const imageFile = req.files?.image;
    const newPassword = updatedData.password;
    const profileId = updatedData._id;
    const users = await Employee.findById(profileId);

    // Validate and update password
    if (newPassword) {
      updatedData.password = bcrypt.hashSync(newPassword, 8);
    }

    // Find the employee with the provided profileId and check if the email already exists
    const existingEmail = await Employee.findOne({ email: updatedData.email });

    if (existingEmail && existingEmail._id.toString() !== profileId) {
      return res.status(400).json({ message: "Email Already Exists." });
    }

    // Check if an image file was uploaded
    if (req.files) {
      const imageFile = req.files?.image;
      if (imageFile) {
        const relativeUploadsPath = "../../../uploads/profile";

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

        if (users.image) {
          const oldImagePath = path.join(__dirname, users.image);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath); // Delete the old image file
          } else {
            console.log(`File Not Found At Path: ${oldImagePath}`);
          }
        }

        const formData = {
          ...updatedData,
          image: concatenatedImagePath,
        };
        const updatedProfile = await Employee.findByIdAndUpdate(
          profileId,
          formData,
          { new: true }
        );

        if (updatedProfile) {
          res.status(200).json({
            data: updatedProfile,
            message: "Profile Updated Successfully!",
          });
        } else {
          res.status(404).json({ message: "User Not Found." });
        }
      }
    } else {
      const updatedProfile = await Employee.findByIdAndUpdate(
        profileId,
        updatedData,
        { new: true }
      );

      if (updatedProfile) {
        res.status(200).json({
          data: updatedProfile,
          message: "Profile Updated Successfully!",
        });
      } else {
        res.status(404).json({ message: "User Not Found." });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Remove Profile
exports.deleteProfile = async (req, res) => {
  try {
    const profileId = req.params.id;

    const deletedProfile = await Employee.findByIdAndDelete(profileId);

    if (deletedProfile) {
      res.status(200).json({ message: "Employee Deleted Successfully!" });
    } else {
      res.status(404).json({ message: "User Not Found." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Update Profile
exports.updatedProfile = async (req, res) => {
  try {
    let profileId = req.params.id;
    let updatedData = req.body;

    // Fetch user data
    let user = await Employee.findById(profileId);

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

        moduleProgressEntry = {
          // is_completed: true,
          course: courseId,
          module: moduleIdToSearch,
          notes: [{ tag: "", note: AddToText }],
        };

        user.module_progress.push(moduleProgressEntry);

        await user.save();

        return res.status(200).json({
          message: "Module Notes Updated Successfully.",
          moduleProgressEntry,
        });
      } else {
        AddText = updatedData.notes;

        const newNotes = [{ tag: "", note: AddText }];

        // Push the new notes to the moduleProgressEntry.notes array
        moduleProgressEntry.notes.push(...newNotes);

        // Save the updated user data
        await user.save();

        // Return the updated module progress entry
        return res.status(200).json({
          message: "Module Notes Updated Successfully.",
          moduleProgressEntry,
        });
      }
    }
  } catch (err) {
    // res.status(500).json({ message: err.message });
  }
};
