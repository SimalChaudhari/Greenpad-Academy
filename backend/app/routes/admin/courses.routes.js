const express = require("express");
const router = express.Router();
const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/admin/courses.controller");

// Middleware
router.use(authJwt.verifyToken);

// Course Routes
router.get("/", controller.getCourseList);
router.get("/:id", controller.getCourseById);
router.put("/:id", controller.updateCourse);
router.put("/update_course/:id", controller.updateCourseModule);
router.post("/", controller.createCourse);
router.delete("/:id", controller.deleteCourse);
router.post("/delete_course/:id", controller.deleteCourseModule);
router.put("/add_course/:id", controller.addCourseModule);

module.exports = router;
