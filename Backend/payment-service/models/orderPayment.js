const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const OrderPayment = sequelize.define('OrderPayment', {
    id: { 
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true 
    },
    order_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    payment_method: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    amount: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false 
    },
    status: { 
        type: DataTypes.STRING, 
        defaultValue: 'PENDING',
        validate: {
            isIn: [['PENDING', 'PROCESSING', 'SUCCESS', 'FAILED', 'REFUNDED', 'CANCELLED']],
          }, 
    },
    transaction_id: { 
        type: DataTypes.STRING 
    }
}, {
    tableName: 'order_payments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = OrderPayment;
