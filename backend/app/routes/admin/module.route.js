const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/admin/module.controller");
const express = require("express");
const router = express.Router();

// Middleware
router.use(authJwt.verifyToken);

// Company Routes
router.post("/:courseId", controller.createModule);
router.get("/:courseId", controller.getModuleList);
router.get("/:id", controller.getModuleById);
router.put("/:id", controller.updateModule);
router.post("/delete/:id", controller.deleteModule);

module.exports = router;
