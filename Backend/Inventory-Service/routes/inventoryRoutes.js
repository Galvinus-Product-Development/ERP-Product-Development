const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryControllers.js");

router.post("/", inventoryController.createInventory);
router.get("/get-allInventory", inventoryController.getAllInventory);

module.exports = router;
