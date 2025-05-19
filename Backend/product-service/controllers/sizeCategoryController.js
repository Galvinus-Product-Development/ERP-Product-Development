const sizeCategoryService = require("../services/sizeCategoryService");

exports.getAllSizeCategories = async (req, res) => {
  try {
    const categories = await sizeCategoryService.getAllSizeCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addSizeCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    const category = await sizeCategoryService.addSizeCategory(category_name);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSizeCategory = async (req, res) => {
    try {
      const { category_id } = req.params;
      const updates = req.body;
      const updatedCategory = await sizeCategoryService.updateSizeCategory(category_id, updates);
      res.status(200).json({ message: "Size category updated successfully", updatedCategory  });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.deleteSizeCategory = async (req, res) => {
    try {
      const { category_id } = req.params;
      await sizeCategoryService.deleteSizeCategory(category_id);
      res.status(200).json({ message: "Size category deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
