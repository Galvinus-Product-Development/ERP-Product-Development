const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const CartItems = sequelize.define('CartItems', {
    cart_items_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    cart_id: {
        type: DataTypes.UUID,
        references: { model: 'Carts', key: 'cart_id' }
    },
    product_item_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    item_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, { 
    tableName: "cart_items",
    timestamps: false });

module.exports = CartItems;
