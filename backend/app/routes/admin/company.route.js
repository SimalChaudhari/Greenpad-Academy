const { authJwt } = require("../../middlewares");
const controller = require("../../controllers/admin/company.controller");
const express = require("express");
const router = express.Router();

// Middleware
router.use(authJwt.verifyToken);

// Company Routes
router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
