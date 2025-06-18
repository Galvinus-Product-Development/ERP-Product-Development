// models/ReturnRequest.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const ReturnRequest = sequelize.define('ReturnRequest', {
  return_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  order_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  order_item_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'REQUESTED',
    validate: {
      isIn: [['REQUESTED', 'APPROVED', 'REFUND_INITIATED', 'REJECTED', 'PICKED_UP', 'REFUNDED']]
    }
  },
  refund_status: {
    type: DataTypes.STRING,
    defaultValue: 'PENDING',
    validate: {
      isIn: [['PENDING', 'INITIATED', 'SUCCESS', 'FAILED']]
    }
  },
  refund_transaction_id: {
    type: DataTypes.STRING(100),
    allowNull:true
  },
  return_requested_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  delivery_date: {
    type: DataTypes.DATE
  },
  return_window_expires_at: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'return_requests',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = ReturnRequest;
