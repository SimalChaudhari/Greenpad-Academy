const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config()

const corsOptions = require("./app/config/cors.config");
const db = require("./app/models");

const authRoutes = require("./app/routes/auth.routes");
const employeeRoutes = require("./app/routes/company/employee.route");
const employeeCoursesRoutes = require("./app/routes/employee/courses.routes");
const companyCoursesRoutes = require("./app/routes/company/courses.routes");
const employeeuserRoutes = require("./app/routes/employee/employee.route");
const employeeExamRoutes = require("./app/routes/employee/exam.routes");
const policyRoutes = require("./app/routes/Guidance-Support/policy.route");
const ProgrammeContactsRoutes = require("./app/routes/Guidance-Support/programmecontacts.route");
const ContactusRoutes = require("./app/routes/Guidance-Support/contactus.route");
const SettingsRoutes = require("./app/routes/setting/setting.route");
const PlansRoutes = require("./app/routes/plans/plans.route");

// employee routes
const employeemodule = require("./app/routes/employee/module.route");

// admin routes
const coursesRoutes_admin = require("./app/routes/admin/courses.routes");
const EmployeeRoutes_admin = require("./app/routes/admin/employee.route");
const CompanyRoutes_admin = require("./app/routes/admin/company.route");
const ModuleRoutes_admin = require("./app/routes/admin/module.route");

const userRoutes = require("./app/routes/user.routes");
const courseRoutes = require("./app/routes/course.routes");
const noteRoutes = require("./app/routes/note.routes.js");
const reportRoutes = require("./app/routes/report.routes.js");

app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Connect to the database
db.mongoose.connection.on("error", (err) => {
  console.error("Database connection error:", err);
  process.exit(1);
});

db.mongoose.connection.once("open", () => {
  console.log("Successfully connected to MongoDB.");
});

app.use('/uploads', express.static('uploads'));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/report", reportRoutes);

// Admin 
app.use("/api/admin/employee", EmployeeRoutes_admin);
app.use("/api/admin/company", CompanyRoutes_admin);
app.use("/api/admin/courses", coursesRoutes_admin);
app.use("/api/admin/modules", ModuleRoutes_admin);

// Employees 
app.use("/api/employee/courses", employeeCoursesRoutes);
app.use("/api/company/employee", employeeRoutes);
app.use("/api/employee", employeeuserRoutes);
app.use("/api/useremp/exam", employeeExamRoutes);
app.use("/api/policy", policyRoutes);
app.use("/api/programmecontacts", ProgrammeContactsRoutes);
app.use("/api/contactus", ContactusRoutes);
app.use("/api/settings", SettingsRoutes);
app.use("/api/plans", PlansRoutes);

// Company
app.use("/api/company/courses", companyCoursesRoutes);

app.get('/', (req, res) => {
  res.send('Hello, world!...........');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
