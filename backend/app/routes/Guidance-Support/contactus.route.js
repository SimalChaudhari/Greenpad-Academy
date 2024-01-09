const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/Guidance-Support/contactus.controller");
const express = require("express");
const router = express.Router();

// Middleware
router.use(authJwt.verifyToken);

// User Routes
router.get("/", controller.get);
router.post("/", controller.create);

module.exports = router;
