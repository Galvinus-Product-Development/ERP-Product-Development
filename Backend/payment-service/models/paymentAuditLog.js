const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PaymentAuditLog = sequelize.define('PaymentAuditLog', {
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
    old_status: { 
        type: DataTypes.STRING,
        validate: {
            isIn: [['PENDING', 'PROCESSING', 'SUCCESS', 'FAILED', 'REFUNDED', 'CANCELLED']],
          }, 
    },
    new_status: { 
        type: DataTypes.STRING,
        validate: {
            isIn: [['PENDING', 'PROCESSING', 'SUCCESS', 'FAILED', 'REFUNDED', 'CANCELLED']],
          },
     },
    changed_by: { type: DataTypes.STRING, defaultValue: 'SYSTEM' }
}, {
    tableName: 'payment_audit_logs',
    timestamps: true,
    createdAt: 'changed_at',
    updatedAt: false
});

module.exports = PaymentAuditLog;
