const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

const mockUserMiddleware = (req, res, next) => {
    req.params.userId = "6f94aefc-36a1-4e7d-8c7f-2a81bbffb002";
    next();
};

router.get('/:userId', mockUserMiddleware, wishlistController.getWishlistByUserId);
router.post('/:userId/items', mockUserMiddleware, wishlistController.addItemToWishlist);
router.delete('/:userId/items/:itemId', mockUserMiddleware, wishlistController.removeItemFromWishlist);
router.post('/:userId/items/:itemId/move-to-cart', mockUserMiddleware, wishlistController.moveToCart);

module.exports = router;
    