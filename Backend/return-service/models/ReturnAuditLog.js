// models/ReturnAuditLog.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const ReturnRequest = require('./ReturnRequest');

const ReturnAuditLog = sequelize.define('ReturnAuditLog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  return_id: {
    type: DataTypes.UUID,
    references: {
      model: ReturnRequest,
      key: 'return_id'
    }
  },
  old_status: DataTypes.STRING,
  new_status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  changed_by: {
    type: DataTypes.STRING,
    defaultValue: 'SYSTEM'
  },
  note: DataTypes.TEXT,
  changed_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'return_audit_logs',
  timestamps: true,
  createdAt: 'changed_at',
  updatedAt: false
});

module.exports = ReturnAuditLog;
