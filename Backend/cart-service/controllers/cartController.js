const cartService = require('../services/cartService');

// Get Cart for User
exports.getCartByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const cart = await cartService.getCartByUserId(userId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 
// Add Item to Cart
exports.addItemToCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const { product_item_id, quantity} = req.body;

        const updatedCart = await cartService.addItemToCart(userId, product_item_id, quantity);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Cart Item Quantity
exports.updateCartItem = async (req, res) => {
    try {
        const { userId, cartItemId } = req.params;
        const { quantity } = req.body;

        const updatedCart = await cartService.updateCartItem(userId, cartItemId, quantity);
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove Item from Cart
exports.removeItemFromCart = async (req, res) => {
    try {
        const { userId,cartItemId  } = req.params;
        //const { product_item_id } = req.body;

        const updatedCart = await cartService.removeItemFromCart(userId, cartItemId );
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Clear Cart
exports.clearCart = async (req, res) => {
    try {
        const { userId } = req.params;

        const clearedCart = await cartService.clearCart(userId);
        res.status(200).json(clearedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
