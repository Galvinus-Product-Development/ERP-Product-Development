const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Colour = sequelize.define(
  "Colour",
  {
    colour_id: {
      type: DataTypes.UUID,
  defaultValue: DataTypes.UUIDV4,
  primaryKey: true,

    },
    colour_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: null,
    },
    colour_code: {  
      type: DataTypes.STRING(10), 
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "colour",
    timestamps: false,
  }
);

module.exports = Colour;
