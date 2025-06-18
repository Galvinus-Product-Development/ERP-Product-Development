const {RatingType} = require("../models");

const getAllRatingTypes = async () => {
    try{
  return await RatingType.findAll();
} catch (error) {
    console.error("Error fetching rating types:", error);
    throw new Error("Failed to fetch rating types");
  }
};

const addRatingType = async (rating_name, label_min, label_max) => {
    try{
  return await RatingType.create({ rating_name, label_min, label_max });
}
   catch (error) {
    console.error("Error creating rating type:", error);
    throw new Error("Failed to create rating type");
  }
};

const updateRatingType = async (rating_type_id, updates) => {
    try {
        const [updatedRows] = await RatingType.update(updates, { where: { rating_type_id } });
        if (updatedRows === 0) {
          throw new Error("Rating type not found or no changes made");
        }
        return { message: "Rating type updated successfully" };
      } catch (error) {
        console.error("Error updating rating type:", error);
        throw new Error("Failed to update rating type");
      }
};

const deleteRatingType = async (rating_type_id) => {
    try {
        const deletedRows = await RatingType.destroy({ where: { rating_type_id } });
        if (deletedRows === 0) {
          throw new Error("Rating type not found");
        }
        return { message: "Rating type deleted successfully" };
      } catch (error) {
        console.error("Error deleting rating type:", error);
        throw new Error("Failed to delete rating type");
      }
};

module.exports = {
  getAllRatingTypes,
  addRatingType,
  updateRatingType,
  deleteRatingType,
};
