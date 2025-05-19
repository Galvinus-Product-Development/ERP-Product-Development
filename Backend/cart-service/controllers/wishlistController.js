const wishlistService = require('../services/wishlistService');

exports.getWishlistByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const wishlist = await wishlistService.getWishlistByUserId(userId);
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addItemToWishlist = async (req, res) => {
    try {
        const { userId } = req.params;
        const { product_id, product_item_id  } = req.body;
        const wishlist = await wishlistService.addItemToWishlist(userId, product_id, product_item_id );
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeItemFromWishlist = async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        const wishlist = await wishlistService.removeItemFromWishlist(userId, itemId);
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.moveToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.params;
        const {wishlist, cart} = await wishlistService.moveToCart(userId, itemId);
        res.status(200).json({wishlist, cart});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
