// models/ShippingAuditLog.js
const { DataTypes } = require('sequelize');
const { sequelize }  = require('../config/db');
const ShippingOrder = require('./ShippingOrder');

const ShippingAuditLog = sequelize.define('ShippingAuditLog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  shipping_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: ShippingOrder, key: 'shipping_id' }
  },
  old_status: {
    type: DataTypes.ENUM('PENDING', 'SHIPPED', 'DELIVERED', 'FAILED', 'CANCELLED', 'REFUNDED')
  },
  new_status: {
    type: DataTypes.ENUM('PENDING', 'SHIPPED', 'DELIVERED', 'FAILED', 'CANCELLED', 'REFUNDED'),
    allowNull: false
  },
  changed_by: {
    type: DataTypes.STRING,
    defaultValue: 'SYSTEM'
  }
}, {
  tableName: 'shipping_audit_logs',
  timestamps: true,
  createdAt: 'changed_at',
  updatedAt: false
});

module.exports = ShippingAuditLog;
