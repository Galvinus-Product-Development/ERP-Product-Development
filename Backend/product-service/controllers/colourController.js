const { Colour } = require('../models');
const { ErrorHandler } = require('../services/errorHandler');

// Get all colours
exports.getAllColours = async (req, res, next) => {
  try {
    const colours = await Colour.findAll({
      order: [['colour_name', 'ASC']]
    });
    res.json(colours);
  } catch (err) {
    next(new ErrorHandler(500, 'Failed to fetch colours', err.message));
  }
};

// Create a new colour
exports.createColour = async (req, res, next) => {
  try {
    const { colour_name, colour_code } = req.body;
    
    const existingColour = await Colour.findOne({ where: { colour_name } });
    if (existingColour) {
      throw new ErrorHandler(400, 'Colour with this name already exists');
    }

    const colour = await Colour.create({
      colour_name,
      colour_code
    });

    res.status(201).json(colour);
  } catch (err) {
    next(err instanceof ErrorHandler ? err : new ErrorHandler(500, 'Failed to create colour', err.message));
  }
};

// Update a colour
exports.updateColour = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { colour_name, colour_code } = req.body;

    const colour = await Colour.findByPk(id);
    if (!colour) {
      throw new ErrorHandler(404, 'Colour not found');
    }

    // Check if another colour with the same name exists
    if (colour_name && colour_name !== colour.colour_name) {
      const existingColour = await Colour.findOne({ where: { colour_name } });
      if (existingColour) {
        throw new ErrorHandler(400, 'Another colour with this name already exists');
      }
    }

    await colour.update({
      colour_name: colour_name || colour.colour_name,
      colour_code: colour_code || colour.colour_code
    });

    res.json(colour);
  } catch (err) {
    next(err instanceof ErrorHandler ? err : new ErrorHandler(500, 'Failed to update colour', err.message));
  }
};

// Delete a colour
exports.deleteColour = async (req, res, next) => {
  try {
    const { id } = req.params;

    const colour = await Colour.findByPk(id);
    if (!colour) {
      throw new ErrorHandler(404, 'Colour not found');
    }

    await colour.destroy();
    res.status(204).send();
  } catch (err) {
    next(err instanceof ErrorHandler ? err : new ErrorHandler(500, 'Failed to delete colour', err.message));
  }
};