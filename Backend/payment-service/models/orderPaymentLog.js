const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const OrderPaymentLog = sequelize.define('OrderPaymentLog', {
    id: { 
        type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4 
    },
    payment_id: { 
        type: DataTypes.UUID, 
        references: { 
            model: 'order_payments', 
            key: 'id' 
        } 
    },
    status: { 
        type: DataTypes.STRING, 
        validate: {
            isIn: [['PENDING', 'PROCESSING', 'SUCCESS', 'FAILED', 'REFUNDED', 'CANCELLED']],
          },
    },
    log_message: { type: DataTypes.TEXT }
}, {
    tableName: 'order_payment_logs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
});

module.exports = OrderPaymentLog;
