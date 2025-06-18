// models/gatewayDetailsModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const OrderPaymentGatewayDetail = sequelize.define('OrderPaymentGatewayDetail', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    payment_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'order_payments',
            key: 'id'
        }
    },
    gateway_name: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    gateway_order_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      gateway_payment_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      
    gateway_response: {
        type: DataTypes.JSONB,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'order_payment_gateway_details',
    timestamps: false,  
});

module.exports = OrderPaymentGatewayDetail;
