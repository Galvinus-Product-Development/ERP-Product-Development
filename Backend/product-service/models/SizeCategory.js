const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const SizeCategory = sequelize.define(
  "SizeCategory",
  {
    category_id: {
      type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,

    },
    category_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      //defaultValue: null,
    },
  },
  {
    tableName: "size_category",
    timestamps: false,
  }
);

module.exports = SizeCategory;
