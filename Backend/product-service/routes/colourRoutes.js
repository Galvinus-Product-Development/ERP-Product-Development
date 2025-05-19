const express = require('express');
const router = express.Router();
const colourController = require('../controllers/colourController');
//const {  } = require("../middlewares/authMiddleware");
const validationHandler = require("../middlewares/validationHandler");
const { colourValidator , validateColourId } = require("../validators/colourValidator");

// Route to get all colours
router.get('/', colourController.getAllColours);

// Route to get a colour by ID
router.get('/:id', validationHandler, validateColourId, colourController.getColourById);

// Route to create a new colour
router.post('/',  validationHandler, colourValidator , colourController.createColour);  // Admin only

// Route to update a colour
router.put('/:id', validationHandler, validateColourId, colourValidator, colourController.updateColour); // Admin only

// Route to soft delete a colour
router.delete('/:id',  validationHandler, validateColourId, colourController.deleteColour); // Admin only

// Route to restore a soft-deleted colour
router.patch('/:id/restore', validationHandler, validateColourId, colourController.restoreColour); // Admin only

module.exports = router;
