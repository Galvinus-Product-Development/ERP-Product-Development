const { sequelize } = require("../config/db"); 
const Order = require('./orderModel');
const OrderItem = require('./orderItemModel');
const OrderAuditLog = require('./orderAuditLogModel');
const OrderNote = require('./orderNoteModel');

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
Order.hasMany(OrderAuditLog, { foreignKey: 'order_id' });
Order.hasMany(OrderNote, { foreignKey: 'order_id' });

OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
OrderAuditLog.belongsTo(Order, { foreignKey: 'order_id' });
OrderNote.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = {
    sequelize,
    Order,
    OrderItem,
    OrderAuditLog,
    OrderNote
};
