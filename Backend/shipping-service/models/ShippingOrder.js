// models/ShippingOrder.js
const { DataTypes } = require('sequelize');
const { sequelize }  = require('../config/db');

const ShippingOrder = sequelize.define('ShippingOrder', {
  shipping_id: {
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
  shipping_address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  courier: DataTypes.STRING(100),
  service_level: {
    type: DataTypes.ENUM('STANDARD', 'EXPRESS', 'REVERSE_PICKUP'),
    defaultValue: 'STANDARD'
  },
  tracking_number: DataTypes.STRING,
  estimated_delivery_date: DataTypes.DATE,
  shipped_at: DataTypes.DATE,
  delivered_at: DataTypes.DATE,
  status: {
    type: DataTypes.ENUM('PENDING', 'SHIPPED', 'DELIVERED', 'FAILED', 'CANCELLED', 'REFUNDED'),
    defaultValue: 'PENDING'
  }
}, {
  tableName: 'shipping_orders',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = ShippingOrder;
