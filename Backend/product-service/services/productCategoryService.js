const {ProductCategory} = require("../models");

// Create a new category (can be parent or child)
const addProductCategory = async (categoryData) => {
  return await ProductCategory.create(categoryData);
};

// Get all categories (including subcategories)
const getAllCategories = async () => {
  const categories = await ProductCategory.findAll({
    include: [
      { model: ProductCategory, 
        as: "Subcategories" },
      {
        model: ProductCategory,
        as: "ParentCategory", // Fetch parent category details
        attributes: ["product_category_id", "category_name"], // Select only required fields
      },
    ],
  });
  // Transform result to add parent_category_name directly in the response
  return categories.map(category => ({
    product_category_id: category.product_category_id,
    category_name: category.category_name,
    parent_category_id: category.parent_category_id,
    parent_category_name: category.ParentCategory ? category.ParentCategory.category_name : null,
    category_image: category.category_image,
    category_description: category.category_description,
    status: category.status
}));
};

// Get category by ID (including subcategories)
const getCategoryById = async (product_category_id) => {
  return await ProductCategory.findByPk(product_category_id, {
    include: [{ model: ProductCategory, as: "Subcategories" }],
  });
};

// Update a category
const updateProductCategory = async (product_category_id, updatedData) => {
  return await ProductCategory.update(updatedData, {
    where: { product_category_id },
  });
};

// Delete a category (will also delete subcategories)
const deleteProductCategory = async (product_category_id) => {
  return await ProductCategory.destroy({
    where: { product_category_id },
  });
};

//  Get only parent categories
const getParentCategories = async () => {
  return await ProductCategory.findAll({
    where: { parent_category_id: null },
  });
};

//  Get all subcategories of a specific category
const getSubcategories = async (product_category_id) => {
  return await ProductCategory.findAll({
    where: { parent_category_id: product_category_id },
  });
};

//  Move a subcategory under a new parent category
const moveSubcategory = async (subcategory_id, new_parent_id) => {
  return await ProductCategory.update(
    { parent_category_id: new_parent_id },
    { where: { product_category_id: subcategory_id } }
  );
};

//  Get all active categories
const getActiveCategories = async () => {
  return await ProductCategory.findAll({
    where: { status: "active" },
  });
};

//  Get all inactive categories
const getInactiveCategories = async () => {
  return await ProductCategory.findAll({
    where: { status: "inactive" },
  });
};

module.exports = {
  addProductCategory,
  getAllCategories,
  getCategoryById,
  updateProductCategory,
  deleteProductCategory,
  getParentCategories,
  getSubcategories,
  moveSubcategory,
  getActiveCategories,
  getInactiveCategories,
};
