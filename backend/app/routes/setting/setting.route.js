const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/settings/setting.controller");
const express = require("express");
const router = express.Router();

// Middleware
router.use(authJwt.verifyToken);

// User Routes
router.get("/", controller.getSetting);

module.exports = router;
