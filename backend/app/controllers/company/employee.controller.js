const bcrypt = require("bcryptjs");
const readXlsxFile = require("read-excel-file/node");
const db = require("../../models");
const {
  sendEmailForEmployeeCreate,
  sendEmailForCompanyCreate,
} = require("../../common/email");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const writeFileAsync = promisify(fs.writeFile);

const Employee = db.User;

// Add Employee Using Sheet
exports.addUsingSheet = async (req, res) => {
  try {
    const created_by = req.userId;
    const file = req.files.file;
    const schema = {
      address: { prop: "address", type: String },
      city: { prop: "town", type: String },
      country: { prop: "country", type: String },
      "employee first name": { prop: "first_name", type: String },
      "employee last name": { prop: "last_name", type: String },
      "job title": { prop: "job_title", type: String },
      department: { prop: "department", type: String },
      email: { prop: "email", type: String },
      "post code": { prop: "post_code", type: String },
      "start date": { prop: "start_date", type: Date },
      "end date": { prop: "end_date", type: Date },
    };

    const rows = await readXlsxFile(file.data, { schema, sheet: "Sheet1" });
    let successCount = 0;
    let failureCount = 0;
    let addedEmployees = [];

    for (let employee of rows.rows) {
      employee.created_by = created_by;
      const password = generatePassword();
      const bcrypt_password = bcrypt.hashSync(password, 8);
      const savedEmployee = await addEmployee(employee, bcrypt_password);
      addedEmployees.push(savedEmployee);
      if (savedEmployee) {
        successCount++;
        await sendEmail(savedEmployee.email, password);
      } else {
        failureCount++;
      }
    }

    return res
      .status(200)
      .json({
        message: "Sheet Uploaded!",
        successCount,
        failureCount,
        data: addedEmployees,
      });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email already exists
    const existingEmail = await Employee.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email Already Exists." });
    }

    // Set the static fields for the company
    const password = generatePassword();
    const bcrypt_password = bcrypt.hashSync(password, 8);
    const employeeData = {
      ...req.body,
      role: "EMPLOYEE",
      is_active: false,
      is_deleted: false,
      created_by: req.userId,
      password: bcrypt_password,
    };

    // Create the employee if email are unique
    const data = await Employee.create(employeeData);

    if (data) {
      await sendEmailForCompanyCreate({
        email: email,
        subject: "Employee Create",
        text: `Welcome to the Greenpad-Academy`,
        password,
      });
    }

    res.status(200).json({ data, message: "Employee Created Successfully!" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

async function addEmployee(employeeData, password) {
  try {
    const { email } = employeeData;

    // Check if email already exists in the database
    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      console.error("Error Adding Employee: Email Already Exists");
      return null;
    }

    const employee = new Employee(employeeData);
    employee.password = password;
    await employee.save();
    return employee;
  } catch (err) {
    console.error("Error Adding Employee:", err);
    return null;
  }
}

async function sendEmail(email, password) {
  await sendEmailForEmployeeCreate({
    email: email,
    subject: "Company Create",
    text: `Welcome to the Greenpad-Academy`,
    password,
  });
  // try {
  //   const transporter = nodemailer.createTransport({

  //     service: 'Gmail',
  //     auth: {
  //         user: mail_email,
  //         pass: mail_password,
  //     },

  //     // service: 'your_email_service',
  //     // auth: {
  //     //   user: 'your_email',
  //     //   pass: 'your_password',
  //     // },
  //   });

  //   const mailOptions = {
  //     from: 'test_email',
  //     to: email,
  //     subject: 'Welcome to the company!',
  //     text: `Your password is: ${password}`,
  //   };

  //   await transporter.sendMail(mailOptions);
  //   console.log('Email sent to:', email);
  // } catch (err) {
  //   console.error('Error sending email:', err);
  // }
}

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

// Get All Employees
exports.getAll = async (req, res) => {
  try {
    const companyId = req.userId;

    const totalRecords = await Employee.countDocuments({
      created_by: companyId,
      is_deleted: false,
    });

    const employees = await Employee.find({
      created_by: companyId,
      is_deleted: false,
    }).populate("courses", "name");

    res.status(200).json({
      data: employees,
      totalRecords,
      message: "Retrieved Employee Details Successfully!",
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Get Profile By Id
exports.getById = async (req, res) => {
  try {
    const profileId = req.params.id;

    const user = await Employee.findById(profileId);

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

// Update Profile
exports.update = async (req, res) => {
  try {
    const profileId = req.params.id;
    const updatedData = req.body;

    const updatedProfile = await Employee.findByIdAndUpdate(
      profileId,
      updatedData,
      { new: true }
    );

    if (updatedProfile) {
      res
        .status(200)
        .json({
          data: updatedProfile,
          message: "Profile Updated Successfully!",
        });
    } else {
      res.status(404).json({ message: "User Not Found." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Remove Profile
exports.deleteProfile = async (req, res) => {
  try {
    const profileId = req.params.id;
    let employee = await Employee.findById(profileId);

    if (employee.image) {
      const oldImagePath = path.join(__dirname, employee.image);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath); // Delete the old image file
      } else {
        console.log(`File Not Found At Path: ${oldImagePath}`);
      }
    }

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
