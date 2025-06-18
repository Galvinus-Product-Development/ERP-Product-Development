const  ratingTypeService  = require("../services/ratingTypeService");

exports.getAllRatingTypes = async (req, res) => {
  try {
    const ratingTypes = await ratingTypeService.getAllRatingTypes();
    res.status(200).json(ratingTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addRatingType = async (req, res) => {
  try {
    const { rating_name, label_min, label_max } = req.body;
    const ratingType = await ratingTypeService.addRatingType(rating_name, label_min, label_max);
    res.status(201).json(ratingType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRatingType = async (req, res) => {
  try {
    const { rating_type_id } = req.params;
    const updates = req.body;
    await ratingTypeService.updateRatingType(rating_type_id, updates);
    res.status(200).json({ message: "Rating type updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRatingType = async (req, res) => {
  try {
    const { rating_type_id } = req.params;
    await ratingTypeService.deleteRatingType(rating_type_id);
    res.status(200).json({ message: "Rating type deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
