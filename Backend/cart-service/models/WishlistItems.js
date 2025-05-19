const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const WishlistItems = sequelize.define('WishlistItems', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    wishlist_id: {
        type: DataTypes.UUID,
        references: { model: 'Wishlists', key: 'id' }
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    product_item_id: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, { 
    tableName: "wishlist_items",
    timestamps: false });

module.exports = WishlistItems;
