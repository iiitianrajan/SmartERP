const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const stockItemController = require("../controllers/stockItemController");

router.post("/", authMiddleware, stockItemController.createStockItem);

router.get("/", authMiddleware, stockItemController.getStockItems);

router.get("/:id", authMiddleware, stockItemController.getStockItemById);

router.put("/:id", authMiddleware, stockItemController.updateStockItem);

router.delete("/:id", authMiddleware, stockItemController.deleteStockItem);

module.exports = router;