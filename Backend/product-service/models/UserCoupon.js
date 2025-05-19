const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const UserCoupon = sequelize.define("UserCoupon", {
    user_coupon_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: DataTypes.UUID, // no FK constraint here
    coupon_id: DataTypes.UUID,
    usage_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    last_used_at: DataTypes.DATE,
  }, {
    tableName: 'user_coupon',
    timestamps: false,
  });

module.exports = UserCoupon;