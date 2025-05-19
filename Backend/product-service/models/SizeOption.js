const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const SizeCategory = require("./SizeCategory");

const SizeOption = sequelize.define(
  "SizeOption",
  {
    size_id: {
      type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,

    },
    size_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      //defaultValue: null,
    },
    sort_order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    size_category_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: SizeCategory,
        key: "category_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    
    },
  },
  {
    tableName: "size_option",
    timestamps: false,
  }
);


module.exports = SizeOption;
