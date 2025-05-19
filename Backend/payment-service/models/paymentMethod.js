const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PaymentMethod = sequelize.define('PaymentMethod', {
    id: { 
        type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4 
    },
    method_name: { 
        type: DataTypes.STRING, 
        unique: true, 
        validate: {
            isIn: [['CREDIT_CARD', 'DEBIT_CARD', 'UPI', 'NET_BANKING', 'WALLET', 'COD', 'BANK_TRANSFER']],
          }, 
    },
    enabled: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true 
    }
}, {
    tableName: 'payment_methods',
    timestamps: false
});

module.exports = PaymentMethod;
