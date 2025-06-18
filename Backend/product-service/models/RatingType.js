const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const RatingType = sequelize.define(
  "RatingType",
  {
    rating_type_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    
    },
    rating_name: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: null,
    },
    label_min: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
    },
    label_max: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "rating_type",
    timestamps: false,
  }
);

module.exports = RatingType;
