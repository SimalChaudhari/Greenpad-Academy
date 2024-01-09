const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/employee/employee.controller");
const express = require("express");
const router = express.Router();

// Middleware
router.use(authJwt.verifyToken);

// User Routes
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.put("/note/:id", controller.updatedProfile);
router.delete("/:id", controller.deleteProfile);

module.exports = router;
