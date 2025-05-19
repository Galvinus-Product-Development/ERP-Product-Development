const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Order = require('./orderModel');
const OrderItem = require('./orderItemModel');
const { validStatuses } = require('../validators/orderValidator');

const OrderAuditLog = sequelize.define('OrderAuditLog', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Order,
            key: 'order_id'
        }
    },
    order_item_id: {
        type: DataTypes.UUID,
        allowNull: true, 
        references: {
          model: OrderItem,
          key: 'order_item_id'
        }
      },
    status: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isIn: [validStatuses]
        }
    },
    changed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    changed_by: {
        type: DataTypes.STRING(255),
        defaultValue: 'SYSTEM'
    }
}, {
    tableName: 'order_audit_logs',
    timestamps: false
});

module.exports = OrderAuditLog;
