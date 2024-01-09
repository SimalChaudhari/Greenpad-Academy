const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/plans/plans.controller");
const express = require("express");
const router = express.Router();

// Middleware
router.use(authJwt.verifyToken);

// User Routes
router.get("/", controller.getPlans);
router.post("/create", controller.createPlans);
router.put("/:id", controller.updatePlans);
router.delete("/:id", controller.deletePlan);

module.exports = router;
