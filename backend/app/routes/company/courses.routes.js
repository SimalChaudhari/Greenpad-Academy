const express = require("express");
const router = express.Router();
const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/company/courses.controller");

// Middleware
router.use(authJwt.verifyToken);

// Course Routes
router.get("/", controller.getCourseList);
router.get("/:id", controller.getCourseById);

module.exports = router;
