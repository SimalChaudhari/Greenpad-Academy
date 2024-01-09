const express = require("express");
const router = express.Router();
const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/employee/exam.controller");

// Middleware
router.use(authJwt.verifyToken);

// Course Routes
router.get("/", controller.getExams);

module.exports = router;
