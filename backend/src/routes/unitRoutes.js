const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const unitController = require("../controllers/unitController");

router.post("/", authMiddleware, unitController.createUnit);

router.get("/", authMiddleware, unitController.getUnits);

router.get("/:id", authMiddleware, unitController.getUnitById);

router.put("/:id", authMiddleware, unitController.updateUnit);

router.delete("/:id", authMiddleware, unitController.deleteUnit);

module.exports = router;