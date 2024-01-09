const bcrypt = require("bcryptjs");
const readXlsxFile = require("read-excel-file/node");
const db = require("../../models");
const nodemailer = require("nodemailer");
const { sendEmailForCompanyCreate } = require("../../common/email");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

const Company = db.User;
const Course = db.Course;

// Create a Company
exports.create = async (req, res) => {
  try {
    const { company_name, email, courses } = req.body;

    // Check if the company_name already exists
    const existingCompany = await Company.findOne({ company_name });
    if (existingCompany) {
      return res.status(400).json({ message: "Company name already exists." });
    }

    // Check if the email already exists
    const existingEmail = await Company.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Set the static fields for the company
    const password = generatePassword();
    const bcrypt_password = bcrypt.hashSync(password, 8);
    const companyData = {
      ...req.body,
      role: "COMPANY",
      is_active: false,
      is_deleted: false,
      created_by: req.userId,
      password: bcrypt_password,
    };

    // Create the company with associated courses if courses are provided
    let company = null;
    if (courses && Array.isArray(courses) && courses.length > 0) {
      const courseIds = courses.map((course) => course.value);
      const areValidObjectIds = courseIds.every((courseId) =>
        mongoose.Types.ObjectId.isValid(courseId)
      );

      if (areValidObjectIds) {
        const courseObjects = await Course.find({
          _id: { $in: courseIds },
        }).exec();
        companyData.courses = courseObjects.map((course) => course._id);
        company = await Company.create(companyData);
      } else {
        return res
          .status(400)
          .json({ message: "Invalid course IDs provided." });
      }
    } else {
      // If courses are not provided, create the company without associated courses
      company = await Company.create(companyData);
    }

    if (company) {
      await sendEmailForCompanyCreate({
        email: email,
        subject: "Company Create",
        text: `Welcome to the Greenpad-Academy`,
        password,
      });
    }

    res
      .status(201)
      .json({ data: company, message: "Company created successfully!" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

function generatePassword(length = 8) {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
}

// Update a Company
exports.update = async (req, res) => {
  try {
    const companyId = req.params.id;
    const updateData = req.body;

    // Check if the company_name already exists
    const existingCompany = await Company.findOne({
      company_name: updateData.company_name,
      _id: { $ne: companyId },
    });
    if (existingCompany) {
      return res.status(400).json({ message: "Company name already exists." });
    }

    // Check if the email already exists
    const existingEmail = await Company.findOne({
      email: updateData.email,
      _id: { $ne: companyId },
    });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists." });
    }

    // Example code for updating a company
    const company = await Company.findByIdAndUpdate(companyId, updateData, {
      new: true,
    });

    // Update associated courses if provided
    if (
      updateData.courses &&
      Array.isArray(updateData.courses) &&
      updateData.courses.length > 0
    ) {
      // Extract the ObjectIds from the provided courses array

      // const courseIds = updateData.courses.map(course => course.value);
      const courseIds = updateData.courses;
      // Validate that all courseIds are valid ObjectIds
      const areValidObjectIds = courseIds.every((courseId) =>
        mongoose.Types.ObjectId.isValid(courseId)
      );

      if (areValidObjectIds) {
        // Find the courses using the provided course IDs and update the company's courses array
        const courseObjects = await Course.find({
          _id: { $in: courseIds },
        }).exec();
        company.courses = courseObjects.map((course) => course._id);
        await company.save();
      } else {
        // Handle the case when some courseIds are invalid ObjectIds
        return res
          .status(400)
          .json({ message: "Invalid course IDs provided." });
      }
    }

    if (company) {
      res
        .status(200)
        .json({ data: company, message: "Company updated successfully!" });
    } else {
      res.status(404).json({ message: "Company not found." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Delete a Company
exports.delete = async (req, res) => {
  try {
    const companyId = req.params.id;
    
    const employees = await Company.find({
      created_by: companyId,
      is_deleted: false,
    }).populate("courses", "name");
    
    if (employees.length > 0) {
      return res.status(400).json({ message: 'First Delete Associated Employees!' });
    }
    let companys = await Company.findById(companyId);
    
    if(companys.image){
        const oldImagePath = path.join(__dirname, companys.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete the old image file
        } else {
          console.log(`File Not Found At Path: ${oldImagePath}`);
        }
    }

    // Example code for deleting a company
    const company = await Company.findByIdAndDelete(companyId);


    if (company) {
      res.status(200).json({ message: "Company Deleted Successfully!" });
    } else {
      res.status(404).json({ message: "Company Not Found." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Get All Companies
exports.getAll = async (req, res) => {
  try {
    const totalRecords = await Company.countDocuments({
      is_deleted: false,
      role: "COMPANY",
    });

    // Find all companies and populate the 'courses' field to get course names
    const companies = await Company.find({
      is_deleted: false,
      role: "COMPANY",
    }).populate("courses", "name"); // Only retrieve the 'name' field of courses
    
    res.status(200).json({
      data: companies,
      totalRecords,
      message: "Retrieved Company Details Successfully!",
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Get Profile By Id
exports.getById = async (req, res) => {
  try {
    const profileId = req.params.id;

    const user = await Company.findById(profileId).populate("course", "name");

    if (user) {
      res
        .status(200)
        .json({
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
