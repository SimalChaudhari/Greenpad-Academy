const { authJwt } = require("../middlewares");
const controller = require("../controllers/course.controller");
const express = require("express");
const router = express.Router();

// * Course Routes

router.post("/add", [authJwt.verifyToken, authJwt.isCompany], controller.addCourse);

router.put("/update/:id", [authJwt.verifyToken, authJwt.isCompany], controller.updateCourse);

router.delete("/remove/:id", [authJwt.verifyToken, authJwt.isCompany], controller.removeCourse);

module.exports = router;
