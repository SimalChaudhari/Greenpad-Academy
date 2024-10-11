const express = require("express");
const router = express.Router();
const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/employee/exam.controller");

// Middleware
router.use(authJwt.verifyToken);

// Route to create an exam
router.post("/", controller.createExam);

// Route to get exams for a specific module
router.get("/modules/:moduleId", controller.getExamsByModuleId);

// New route for inserting default questions
router.post("/insert-default-questions", controller.insertDefaultQuestions);

module.exports = router;
