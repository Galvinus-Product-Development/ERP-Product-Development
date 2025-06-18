const express = require('express');
const router = express.Router();
const sizeController = require('../controllers/sizeOptionController');
const { validateSize } = require('../validators/sizeOptionValidator');

// Get all sizes
router.get('/', sizeController.getAllSizes);

// Get sizes by category
router.get('/category/:categoryId', sizeController.getSizesByCategory);

// Create a new size
router.post('/', validateSize, sizeController.createSize);

// Update a size
router.put('/:id', validateSize, sizeController.updateSize);

// Delete a size
router.delete('/:id', sizeController.deleteSize);

module.exports = router;