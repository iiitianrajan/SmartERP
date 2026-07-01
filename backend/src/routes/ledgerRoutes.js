const express = require("express");

const router = express.Router();

const ledgerController = require("../controllers/ledgerController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/",authMiddleware,ledgerController.createLedger);

router.get("/", authMiddleware, ledgerController.getLedgers);

router.get("/:id", authMiddleware, ledgerController.getLedgerById);

router.put("/:id", authMiddleware, ledgerController.updateLedger);

router.delete("/:id", authMiddleware, ledgerController.deleteLedger);

module.exports = router;
