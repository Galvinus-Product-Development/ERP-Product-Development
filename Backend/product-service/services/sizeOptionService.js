const {SizeOption} = require("../models");

const getSizeOptionsByCategory = async (category_id) => {
  try {
    let query = {};
    if (category_id) {
      query = { where: { size_category_id: category_id } };
    }
    return await SizeOption.findAll(query);
  } catch (error) {
    console.error("Error fetching size options:", error);
    throw new Error("Failed to fetch size options");
  }
};

const addSizeOption = async (size_name, sort_order, size_category_id) => {
  try {
    return await SizeOption.create({ size_name, sort_order, size_category_id });
  } catch (error) {
    console.error("Error creating size option:", error);
    throw new Error("Failed to create size option");
  }
};

const updateSizeOption = async (size_id, updates) => {
  try {
    const [updatedRows] = await SizeOption.update(updates, { where: { size_id },  returning: true, });
    if (updatedRows === 0) {
      throw new Error("Size option not found or no changes made");
    }
    // Fetch the updated size option
    const updatedSizeOption = await SizeOption.findByPk(size_id);
    return updatedSizeOption;
  } catch (error) {
    console.error("Error updating size option:", error);
    throw new Error("Failed to update size option");
  }
};

const deleteSizeOption = async (size_id) => {
  try {
    const deletedRows = await SizeOption.destroy({ where: { size_id } });
    if (deletedRows === 0) {
      throw new Error("Size option not found");
    }
    return { message: "Size option deleted successfully" };
  } catch (error) {
    console.error("Error deleting size option:", error);
    throw new Error("Failed to delete size option");
  }
};

module.exports = {
  getSizeOptionsByCategory,
  addSizeOption,
  updateSizeOption,
  deleteSizeOption,
};
