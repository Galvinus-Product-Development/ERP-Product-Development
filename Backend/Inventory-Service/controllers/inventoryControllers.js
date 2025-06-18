const inventoryService = require("../services/inventoryServices.js");

exports.createInventory = async (req, res) => {
  try {
    const data = await inventoryService.createInventory(req.body);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllInventory = async (req, res) => {
  try {
  } catch (error) {}
};
