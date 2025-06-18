const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const Carts = sequelize.define('Carts', {
    cart_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: true
    },
    overall_total: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00
    }
}, {
    tableName: "carts", 
    timestamps: false });

module.exports = Carts;
