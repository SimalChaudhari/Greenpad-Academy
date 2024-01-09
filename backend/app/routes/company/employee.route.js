const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/company/employee.controller");
const express = require("express");
const router = express.Router();

// Middleware
router.use(authJwt.verifyToken);

// User Routes
router.post("/", controller.addUsingSheet);
router.post("/create", controller.createEmployee);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.deleteProfile);

module.exports = router;
