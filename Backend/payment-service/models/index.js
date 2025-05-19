// models/index.js
const { sequelize } = require('../config/db');

const OrderPayment = require('./orderPayment');
const OrderPaymentLog = require('./orderPaymentLog');
const OrderPaymentGatewayDetail = require('./orderPaymentGatewayDetail');
const PaymentAuditLog = require('./paymentAuditLog');
const PaymentMethod = require('./paymentMethod');

// Associations
OrderPayment.hasMany(OrderPaymentLog, { foreignKey: 'payment_id' });
OrderPaymentLog.belongsTo(OrderPayment, { foreignKey: 'payment_id' });

OrderPayment.hasMany(PaymentAuditLog, { foreignKey: 'payment_id' });
PaymentAuditLog.belongsTo(OrderPayment, { foreignKey: 'payment_id' });

OrderPayment.hasOne(OrderPaymentGatewayDetail, { foreignKey: 'payment_id' });
OrderPaymentGatewayDetail.belongsTo(OrderPayment, { foreignKey: 'payment_id' });

module.exports = {
  sequelize,
  OrderPayment,
  OrderPaymentLog,
  PaymentAuditLog,
  OrderPaymentGatewayDetail,
  PaymentMethod
};
