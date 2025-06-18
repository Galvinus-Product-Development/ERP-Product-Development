const express = require('express');
const router = express.Router();
const colourController = require('../controllers/colourController');
const { validateColour } = require('../validators/colourValidator');

// Get all colours
router.get('/', colourController.getAllColours);

// Create a new colour
router.post('/', validateColour, colourController.createColour);

// Update a colour
router.put('/:id', validateColour, colourController.updateColour);

// Delete a colour
router.delete('/:id', colourController.deleteColour);

module.exports = router;