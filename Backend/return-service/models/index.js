const Sequelize = require('sequelize');
const { sequelize } = require('../config/db');

// Import models
const ReturnRequest = require('./ReturnRequest');
const ReturnAuditLog = require('./ReturnAuditLog');
const ReturnAttachment = require('./ReturnAttachment');

// Associations
const initAssociations = () => {
  // ReturnRequest can have many ReturnAuditLogs (1-to-many relationship)
  ReturnRequest.hasMany(ReturnAuditLog, {
    foreignKey: 'return_id',
    as: 'auditLogs'
  });
  ReturnAuditLog.belongsTo(ReturnRequest, {
    foreignKey: 'return_id',
    as: 'returnRequest'
  });

  // ReturnRequest can have many ReturnAttachments (1-to-many relationship)
  ReturnRequest.hasMany(ReturnAttachment, {
    foreignKey: 'return_id',
    as: 'attachments'
  });
  ReturnAttachment.belongsTo(ReturnRequest, {
    foreignKey: 'return_id',
    as: 'returnRequest'
  });
};
// Initialize associations
initAssociations();

// Export models and Sequelize instance
module.exports = {
  sequelize,
  ReturnRequest,
  ReturnAuditLog,
  ReturnAttachment
};
