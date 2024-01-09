const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

// * Report Routes

router.post("/addEmployeesSheet", [authJwt.verifyToken, authJwt.isCompany], controller.addEmployeesUsingSheet);

router.get("/getProfileById/:id", [authJwt.verifyToken], controller.getProfileById);

router.put("/updateProfile/:id", [authJwt.verifyToken], controller.updateProfile);

router.delete("/removeProfile/:id", [authJwt.verifyToken], controller.removeProfile);

module.exports = router;
