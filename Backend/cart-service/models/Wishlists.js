const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const Wishlists = sequelize.define('Wishlists', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, { 
    tableName: "wishlists",
    timestamps: false });

module.exports = Wishlists;
