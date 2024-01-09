const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/employee/module.controller");
const express = require("express");
const router = express.Router();

// Middleware
router.use(authJwt.verifyToken);

// Employee Module Routes
router.get("/:courseId", controller.getModuleList);
router.get("/:id", controller.getModuleById);

module.exports = router;
