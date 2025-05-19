const sizeOptionService = require("../services/sizeOptionService");

exports.getSizeOptionsByCategory = async (req, res) => {
  try {
    const { category_id } = req.query;
     // Validate category_id (Optional: Ensure it's UUID)
     if (category_id && !/^[0-9a-fA-F-]{36}$/.test(category_id)) {
      return res.status(400).json({ error: "Invalid category_id format." });
    }

    const sizes = await sizeOptionService.getSizeOptionsByCategory(category_id);
    res.status(200).json(sizes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addSizeOption = async (req, res) => {
  try {
    const { size_name, sort_order, size_category_id } = req.body;
    const size = await sizeOptionService.addSizeOption(size_name, sort_order, size_category_id);
    res.status(201).json(size);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSizeOption = async (req, res) => {
    try {
      const { size_id } = req.params;
      const updates = req.body;
      const updatedSize = await sizeOptionService.updateSizeOption(size_id, updates);
      res.status(200).json({ message: "Size option updated successfully", updatedSize});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.deleteSizeOption = async (req, res) => {
    try {
      const { size_id } = req.params;
      await sizeOptionService.deleteSizeOption(size_id);
      res.status(200).json({ message: "Size option deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };