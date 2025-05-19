const {sequelize} = require('../config/db');
const Carts = require('./Carts');
const CartItems = require('./CartItems');
const Wishlists = require('./Wishlists');
const WishlistItems = require('./WishlistItems'); 

Carts.hasMany(CartItems, { foreignKey: 'cart_id', onDelete: 'CASCADE' });
CartItems.belongsTo(Carts, { foreignKey: 'cart_id' });


Wishlists.hasMany(WishlistItems, { foreignKey: 'wishlist_id', onDelete: 'CASCADE' });
WishlistItems.belongsTo(Wishlists, { foreignKey: 'wishlist_id' });

module.exports = {
    sequelize,
    Carts,
    CartItems,
    Wishlists,
    WishlistItems,

};
