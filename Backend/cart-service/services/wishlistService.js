const { Wishlists, WishlistItems, Carts, CartItems } = require('../models');
const axios = require('axios');
const CartService = require('./cartService');
const { PRODUCT_SERVICE_URL } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

exports.getWishlistByUserId = async (userId) => {
    let wishlist = await Wishlists.findOne({ where: { user_id: userId }, include: [WishlistItems] });
    if (!wishlist) {
        wishlist = await Wishlists.create({ user_id: userId });
    }

    const enrichedItems = await Promise.all(wishlist.WishlistItems.map(async (item) => {
        try {
            const response = await axios.get(`${PRODUCT_SERVICE_URL}/products/${item.product_id}`);
            const productInfo = response.data?.data || {};
              // Log to check the fetched data
              console.log('Fetched Product Info:', productInfo);
            return {
                ...item.toJSON(),
                product_info: productInfo
            };
        } catch (err) {
            console.error(`Product fetch failed for ${item.product_id}: ${err.message}`);
            return item;
        }
    }));

    return {
        ...wishlist.toJSON(),
        WishlistItems: enrichedItems
    };
};

exports.addItemToWishlist = async (userId, productId, productItemId) => {
    let wishlist = await Wishlists.findOne({ where: { user_id: userId } });
    if (!wishlist) {
        wishlist = await Wishlists.create({ user_id: userId });
    }

    const existing = await WishlistItems.findOne({ where: {  
        wishlist_id: wishlist.id, 
        product_id: productId,
        product_item_id: productItemId 
    } });
    if (existing) throw new Error("Product already in wishlist");

    await WishlistItems.create({  
        wishlist_id: wishlist.id, 
        product_id: productId,
        product_item_id: productItemId
    });

    return await exports.getWishlistByUserId(userId);
};

exports.removeItemFromWishlist = async (userId, itemId) => {
    const wishlist = await Wishlists.findOne({ where: { user_id: userId } });
    if (!wishlist) throw new Error("Wishlist not found");

    await WishlistItems.destroy({ where: { id: itemId, wishlist_id: wishlist.id } });

    return await exports.getWishlistByUserId(userId);
};

exports.moveToCart = async (userId, itemId) => {
    try {
        // Fetch the wishlist and associated items
        const wishlist = await Wishlists.findOne({
            where: { user_id: userId },
            include: [WishlistItems]
        });
        if (!wishlist) throw new Error("Wishlist not found");

        // Find the item in the wishlist by itemId (not product_item_id)
        const item = wishlist.WishlistItems.find(wi => wi.id === itemId);
        if (!item) throw new Error("Item not found in wishlist");

        console.log('Item:', item);

        // Fetch product info from the ProductService
        const response = await axios.get(`${PRODUCT_SERVICE_URL}/product-items/item/${item.product_item_id}`);
        const product = response.data?.data;

        if (!product || !product.sale_price) {
            throw new Error("Invalid product data from ProductService");
        }

        const unitPrice = parseFloat(product.sale_price);

        // Create or fetch the user's cart using CartService
        let cart = await CartService.getCartByUserId(userId);
        // Check if the item is already in the cart
        let cartItem = await CartItems.findOne({
            where: { cart_id: cart.cart_id, product_item_id: item.product_item_id }
        });

        if (cartItem) {
            // If the item exists in the cart, update the quantity
            cartItem.quantity += 1; // Assuming you add 1 to the quantity
            cartItem.item_total = cartItem.quantity * unitPrice;
            await cartItem.save();
        } else {
            // Otherwise, create a new cart item
            await CartItems.create({
                cart_id: cart.cart_id,
                product_item_id: item.product_item_id,
                quantity: 1, // Default to quantity 1
                unit_price: unitPrice,
                item_total: unitPrice
            });
        }

        // Remove the item from the wishlist
        await WishlistItems.destroy({ where: { id: itemId } });

        // Recalculate the cart total
        await updateCartTotal(cart.cart_id);

        // Return the updated wishlist and cart
        return {
            wishlist: await exports.getWishlistByUserId(userId),
            cart: await CartService.getCartByUserId(userId)
        };
    } catch (error) {
        throw new Error(`Error moving item to cart: ${error.message}`);
    }
};


// Private Helper - Recalculate Cart Total (same as in CartService)
async function updateCartTotal(cartId) {
    const items = await CartItems.findAll({ where: { cart_id: cartId } });
    const overallTotal = items.reduce((sum, item) => sum + parseFloat(item.item_total), 0);

    await Carts.update(
        { overall_total: overallTotal.toFixed(2) },
        { where: { cart_id: cartId } }
    );
}