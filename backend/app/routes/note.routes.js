const { authJwt } = require("../middlewares");
const controller = require("../controllers/note.controller.js");
const express = require("express");
const router = express.Router();

// * Note Routes

router.post("/add", [authJwt.verifyToken, authJwt.isCompany], controller.addNote);

router.put("/update/:id", [authJwt.verifyToken, authJwt.isCompany], controller.updateNote);

router.delete("/remove/:id", [authJwt.verifyToken, authJwt.isCompany], controller.removeNote);

module.exports = router;
