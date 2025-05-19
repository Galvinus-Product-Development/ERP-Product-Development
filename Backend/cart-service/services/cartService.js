const axios = require('axios');
const { Op } = require('sequelize');
const { Carts, CartItems } = require('../models');  // Ensure index.js exports both models
const { PRODUCT_SERVICE_URL } = require('../config/db');

// Get Cart with Items
exports.getCartByUserId = async (userId) => {
    try {
        let cart = await Carts.findOne({
            where: { user_id: userId },
            include: [CartItems]
        });

        if (!cart) {
            cart = await Carts.create({ user_id: userId });
        }

        const enrichedItems = await Promise.all(cart.CartItems.map(async (item) => {
            try {
                const response = await axios.get(`${PRODUCT_SERVICE_URL}/product-items/item/${item.product_item_id}`);
                const product = response.data?.data;

                return {
                    ...item.toJSON(),
                    product_info: {
                        product_item_id: product.product_item_id,
                        product_id: product.product_id,
                        name: product.Product?.product_name,
                        colour: product.Colour?.colour_name,
                        size: product.SizeOption?.size_name,
                        image: product.ProductImages?.[0]?.image_url || null,
                        sale_price: product.sale_price
                    }
                };
            } catch (error) {
                console.error(`ProductService fetch error for item ${item.product_item_id}: ${error.message}`);
                return item;
            }
        }));

        return {
            ...cart.toJSON(),
            CartItems: enrichedItems
        };
    } catch (error) {
        throw new Error(`Error fetching cart: ${error.message}`);
    }
};


// Add Item to Cart
exports.addItemToCart = async (userId, productItemId, quantity) => {
    try {

        const response = await axios.get(`${PRODUCT_SERVICE_URL}/product-items/item/${productItemId}`);
        const data = response.data?.data;

        if (!data || !data.sale_price) {
            throw new Error("Invalid product item data from ProductService");
        }

        const unitPrice = parseFloat(data.sale_price);

        let cart = await Carts.findOne({ where: { user_id: userId } });

        if (!cart) {
            cart = await Carts.create({ user_id: userId });
        }

        let item = await CartItems.findOne({
            where: { cart_id: cart.cart_id, product_item_id: productItemId}
        });

        if (item) {
            item.quantity += quantity;
            //item.unit_price = unitPrice;
            item.item_total = item.quantity * unitPrice;
            await item.save();
        } else {
            // Add new item
            await CartItems.create({
                cart_id: cart.cart_id,
                product_item_id: productItemId,
                quantity,
                unit_price: unitPrice,
                item_total: quantity * unitPrice
            });
        }

        // Recalculate cart total
        await updateCartTotal(cart.cart_id);

        return await exports.getCartByUserId(userId);
    } catch (error) {
        throw new Error(`Error adding item to cart: ${error.message}`);
    }
};

// Update Item Quantity
exports.updateCartItem = async (userId, cartItemId, newQuantity) => {
    try {
        const cart = await Carts.findOne({ where: { user_id: userId } });
        if (!cart) throw new Error('Cart not found');

        const item = await CartItems.findOne({
            where: { cart_items_id: cartItemId, cart_id: cart.cart_id }
        });

        if (!item) throw new Error('Item not found in cart');

        item.quantity = newQuantity;
        item.item_total = item.unit_price * newQuantity;
        await item.save();

        await updateCartTotal(cart.cart_id);

        return await exports.getCartByUserId(userId);
    } catch (error) {
        throw new Error(`Error updating cart item: ${error.message}`);
    }
};

// Remove Item from Cart
exports.removeItemFromCart = async (userId, cartItemId) => {
    try {
        const cart = await Carts.findOne({ where: { user_id: userId } });
        if (!cart) throw new Error('Cart not found');

        await CartItems.destroy({
            where: {cart_items_id: cartItemId, cart_id: cart.cart_id }
        });

        await updateCartTotal(cart.cart_id);

        return await exports.getCartByUserId(userId);
    } catch (error) {
        throw new Error(`Error removing item from cart: ${error.message}`);
    }
};

// Clear Cart
exports.clearCart = async (userId) => {
    try {
        const cart = await Carts.findOne({ where: { user_id: userId } });
        if (!cart) throw new Error('Cart not found');

        await CartItems.destroy({ where: { cart_id: cart.cart_id } });

        cart.overall_total = 0.00;
        await cart.save();

        return await exports.getCartByUserId(userId);
    } catch (error) {
        throw new Error(`Error clearing cart: ${error.message}`);
    }
};

// Private Helper - Recalculate Cart Total
async function updateCartTotal(cartId) {
    const items = await CartItems.findAll({ where: { cart_id: cartId } });
    const overallTotal = items.reduce((sum, item) => sum + parseFloat(item.item_total), 0);

    await Carts.update(
        { overall_total: overallTotal.toFixed(2) },
        { where: { cart_id: cartId } }
    );
}
