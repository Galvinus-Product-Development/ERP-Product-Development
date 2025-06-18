// models/ReturnAttachment.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const ReturnRequest = require('./ReturnRequest');

const ReturnAttachment = sequelize.define('ReturnAttachment', {
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
  file_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  file_type: DataTypes.STRING,
  uploaded_by: DataTypes.STRING,
  uploaded_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'return_attachments',
  timestamps: true
});

module.exports = ReturnAttachment;
