const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();

// Auth Routes

router.post("/registration", [verifySignUp.checkDuplicateEmail], controller.registration);

router.post("/login", controller.login);

router.post("/forgotPassword", controller.forgotPassword);

router.post("/resetPassword", controller.resetPassword);

router.post("/logout", controller.logout);

router.get('/reset-password/validate', controller.validateResetToken);


module.exports = router;
