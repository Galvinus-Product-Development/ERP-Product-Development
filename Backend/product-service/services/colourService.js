const { Colour } = require("../models");

// Get all colours (excluding soft-deleted ones)
const getAllColours = async () => {
    return await Colour.findAll();
  };
  
  // Get a colour by its ID
  const getColourById = async (id) => {
    return await Colour.findByPk(id);
  };
  
  // Create a new colour
  const createColour = async (data) => {
    const { colour_name, colour_code } = data;
    return await Colour.create({ colour_name, colour_code });
  };
  
  // Update an existing colour
  const updateColour = async (id, data) => {
    const colour = await Colour.findByPk(id);
    if (!colour) {
      throw new Error('Colour not found');
    }
    return await colour.update(data);
  };
  
  // Soft delete a colour (using Sequelize’s paranoid feature)
  const deleteColour = async (id) => {
    const colour = await Colour.findByPk(id);
    if (!colour) {
      throw new Error('Colour not found');
    }
    return await colour.destroy();
  };
  
  // Restore a soft-deleted colour
  const restoreColour = async (id) => {
    const colour = await Colour.findOne({
      where: { id },
      paranoid: false, // include soft-deleted records
    });
    if (!colour) {
      throw new Error('Colour not found');
    }
    return await colour.restore();
  };
  
  module.exports = {
    getAllColours,
    getColourById,
    createColour,
    updateColour,
    deleteColour,
    restoreColour,
  };
