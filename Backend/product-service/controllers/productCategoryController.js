const productCategoryService = require("../services/productCategoryService");

exports.addProductCategory = async (req, res) => {
  try {
    const category = await productCategoryService.addProductCategory(req.body);
    res.status(201).json({ message: "Category added successfully", category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await productCategoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { product_category_id } = req.params;
    const category = await productCategoryService.getCategoryById(product_category_id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProductCategory = async (req, res) => {
  try {
    const { product_category_id } = req.params;
    await productCategoryService.updateProductCategory(product_category_id, req.body);
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProductCategory = async (req, res) => {
  try {
    const { product_category_id } = req.params;
    await productCategoryService.deleteProductCategory(product_category_id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//  Get only parent categories
exports.getParentCategories = async (req, res) => {
  try {
    const parents = await productCategoryService.getParentCategories();
    res.status(200).json(parents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Get all subcategories of a category
exports.getSubcategories = async (req, res) => {
  try {
    const { product_category_id } = req.params;
    const subcategories = await productCategoryService.getSubcategories(product_category_id);
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Move a subcategory under a new parent category
exports.moveSubcategory = async (req, res) => {
  try {
    const { subcategory_id, new_parent_id } = req.params;
    await productCategoryService.moveSubcategory(subcategory_id, new_parent_id);
    res.status(200).json({ message: "Subcategory moved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Get all active categories
exports.getActiveCategories = async (req, res) => {
  try {
    const activeCategories = await productCategoryService.getActiveCategories();
    res.status(200).json(activeCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  Get all inactive categories
exports.getInactiveCategories = async (req, res) => {
  try {
    const inactiveCategories = await productCategoryService.getInactiveCategories();
    res.status(200).json(inactiveCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
