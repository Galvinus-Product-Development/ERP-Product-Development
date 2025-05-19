const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { validateAddItem, validateUpdateItem, validateRemoveItem } = require('../validators/cartValidator');

const mockUserMiddleware = (req, res, next) => {
    req.params.userId = "6f94aefc-36a1-4e7d-8c7f-2a81bbffb002"; // Or use req.user.id when UserService is ready
    next();
};

router.get('/:userId', mockUserMiddleware, cartController.getCartByUserId);

// Add Item to Cart
router.post('/:userId/items', mockUserMiddleware,  validateAddItem, cartController.addItemToCart);

// Update Item Quantity
router.put('/:userId/items/:cartItemId', mockUserMiddleware, validateUpdateItem, cartController.updateCartItem);

// Remove Item from Cart
router.delete('/:userId/items/:cartItemId', mockUserMiddleware, validateRemoveItem, cartController.removeItemFromCart);

// Clear Cart
router.delete('/:userId', mockUserMiddleware, cartController.clearCart);
module.exports = router;


