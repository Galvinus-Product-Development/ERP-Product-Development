const colourService = require('../services/colourService');

// Get all colours
const getAllColours = async (req, res) => {
  try {
    const colours = await colourService.getAllColours();
    res.status(200).json(colours);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a colour by ID
const getColourById = async (req, res) => {
  try {
    const { id } = req.params;
    const colour = await colourService.getColourById(id);
    if (!colour) {
      return res.status(404).json({ message: 'Colour not found' });
    }
    res.status(200).json(colour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new colour
const createColour = async (req, res) => {
  try {
    const colour = await colourService.createColour(req.body);
    res.status(201).json(colour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a colour
const updateColour = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedColour = await colourService.updateColour(id, req.body);
    res.status(200).json(updatedColour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Soft delete a colour
const deleteColour = async (req, res) => {
  try {
    const { id } = req.params;
    await colourService.deleteColour(id);
    res.status(200).json({ message: 'Colour deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Restore a soft-deleted colour
const restoreColour = async (req, res) => {
  try {
    const { id } = req.params;
    const restoredColour = await colourService.restoreColour(id);
    res.status(200).json(restoredColour);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllColours,
  getColourById,
  createColour,
  updateColour,
  deleteColour,
  restoreColour,
};
