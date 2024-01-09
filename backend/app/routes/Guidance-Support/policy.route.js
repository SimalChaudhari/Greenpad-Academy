const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/Guidance-Support/policy.controller");
const express = require("express");
const router = express.Router();

// Middleware
router.use(authJwt.verifyToken);

// User Routes
router.get("/", controller.get);

module.exports = router;
