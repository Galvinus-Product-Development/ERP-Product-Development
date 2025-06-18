const {SizeCategory} = require("../models");

const getAllSizeCategories = async () => {
  try {
    return await SizeCategory.findAll();
  } catch (error) {
    console.error("Error fetching size categories:", error);
    throw new Error("Failed to fetch size categories");
  }
};

const addSizeCategory = async (category_name) => {
  try {
    return await SizeCategory.create({ category_name });
  } catch (error) {
    console.error("Error creating size category:", error);
    throw new Error("Failed to create size category");
  }
};

const updateSizeCategory = async (category_id, updates) => {
  try {
    const [updatedRows] = await SizeCategory.update(updates, { where: { category_id }, returning: true });
    if (updatedRows === 0) {
      throw new Error("Size category not found or no changes made");
    }
   // Fetch the updated category
   const updatedCategory = await SizeCategory.findByPk(category_id);
   return updatedCategory; 
  } catch (error) {
    console.error("Error updating size category:", error);
    throw new Error("Failed to update size category");
  }
};

const deleteSizeCategory = async (category_id) => {
  try {
    const deletedRows = await SizeCategory.destroy({ where: { category_id } });
    if (deletedRows === 0) {
      throw new Error("Size category not found");
    }
    return { message: "Size category deleted successfully" };
  } catch (error) {
    console.error("Error deleting size category:", error);
    throw new Error("Failed to delete size category");
  }
};

module.exports = {
  getAllSizeCategories,
  addSizeCategory,
  updateSizeCategory,
  deleteSizeCategory,
};
