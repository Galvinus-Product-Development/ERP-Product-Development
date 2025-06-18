/*const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/db");

const sequelize = new Sequelize(dbConfig);

const models = {
  ShippingOrder: require("./ShippingOrder")(sequelize, DataTypes),
  ShippingAuditLog: require("./ShippingAuditLog")(sequelize, DataTypes),
};

models.ShippingAuditLog.belongsTo(models.ShippingOrder, { foreignKey: 'shippingId' });

module.exports = { ...models, sequelize };
*/