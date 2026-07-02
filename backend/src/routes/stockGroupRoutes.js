const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const stockGroupController = require("../controllers/stockGroupController");

router.post("/", authMiddleware, stockGroupController.createStockGroup);

router.get("/", authMiddleware, stockGroupController.getStockGroups);

router.get("/:id", authMiddleware, stockGroupController.getStockGroupById);

router.put("/:id", authMiddleware, stockGroupController.updateStockGroup);

router.delete("/:id", authMiddleware, stockGroupController.deleteStockGroup);

module.exports = router;