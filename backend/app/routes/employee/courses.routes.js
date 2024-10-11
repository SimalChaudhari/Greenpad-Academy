const express = require("express");
const router = express.Router();
const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/employee/courses.controller");

// Middleware
router.use(authJwt.verifyToken);

// Course Routes
router.get("/", controller.getCourseList);
router.get("/get_all_progress", controller.getAllModuleProgressForCourse);
router.get("/:id", controller.getCourseById);
router.post("/update_progress/:id", controller.updateProgress);
router.post("/update_progress", controller.updateProgress);
router.get("/get_progress/:id", controller.getModuleProgressForCourse);
router.put("/add/note/:id", controller.updatedProfile);
router.put("/notes/:id", controller.updatedNotes);
router.post("/delete/note/:id", controller.deleteNoteProfile);
router.post("/edit/note/:id", controller.updateNoteProfile);

module.exports = router;
