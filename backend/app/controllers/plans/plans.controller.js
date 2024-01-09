const db = require("../../models");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

const Plans = db.Plans;

// Get Planss

exports.getPlans = async (req, res) => {
    try {  
      const palns = await Plans.find({
      });
  
      res.status(200).json({
        data: palns,
        message: 'Retrieved Planss Details Successfully!',
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };

// Create a new course
exports.createPlans = async (req, res) => {
  try {
    const { title } = req.body;

    // Validate the required fields
    if (!title) {
      return res.status(400).json({ message: "All Fields Are Required!" });
    }

    const palns = new Plans({
      title
    });

    // Check if an image file was uploaded
    if (req.files) {
      const pdfFile = req.files?.file;
      if (pdfFile) {
        const relativeUploadsPath = "../../../uploads/plans";

        // Define the full path where the image will be saved
        const fullPath = path.join(
          __dirname,
          relativeUploadsPath,
          Date.now() + "-" + pdfFile.name
          );

        // Calculate the relative imagePath
        const imagePath = path.relative(process.cwd(), fullPath);
        const concatenatedImagePath = "..\\..\\..\\" + imagePath;

        await writeFileAsync(imagePath, pdfFile.data); // Save the file to disk

        palns.pdffile = concatenatedImagePath; // Set the image path in the course object
      }
    }

    await palns.save();

    res
      .status(201)
      .json({ message: "Plans Created Successfully!", data: palns });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a course
exports.updatePlans = async (req, res) => {
  try {
    const { _id, title } = req.body;
    const plans = await Plans.findById(_id);

    // Validate the required fields
    if (!title) {
      return res.status(400).json({ message: "All Fields Are Required!" });
    }

    plans.title = title;
    plans.updated_at = new Date()

    await plans.save();

    res.json({ message: "Plans Updated Successfully!", data: plans });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a course
exports.deletePlan = async (req, res) => {
  try {
    const courseId = req.params.id;

    let plan = await Plans.findById(courseId);

    if (!plan) {
      return res.status(404).json({ message: "Plans Not Nound!" });
    }

    if (plan.pdffile) {
      const oldImagePath = path.join(__dirname, plan.pdffile);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Delete the old image file
      } else {
        console.log(`File Not Found At Path: ${oldImagePath}`);
      }
    }
    await plan.remove();

    res.json({ message: "Plans Deleted Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};