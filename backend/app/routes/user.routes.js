const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

// * User Routes

router.post("/addEmployeesSheet", [authJwt.verifyToken, authJwt.isAdmin || authJwt.isCompany], controller.addEmployeesUsingSheet);

router.get("/getAllEmployees", [authJwt.verifyToken, authJwt.isAdmin || authJwt.isCompany], controller.getAllEmployees);

router.get("/getAllCompanies", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllCompanies);

router.get("/getProfileById/:id", [authJwt.verifyToken], controller.getProfileById);

router.put("/updateProfile/:id", [authJwt.verifyToken], controller.updateProfile);

router.delete("/removeProfile/:id", [authJwt.verifyToken], controller.removeProfile);

module.exports = router;
