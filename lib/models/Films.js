const { DataTypes, Model } = require('sequelize');
const db = require('../utils/db');
const Actor = require('../models/Actors');
class Film extends Model {}

Film.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1000, max: 9999 },
    },
    cast: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  { sequelize: db, timestamps: false }
);

module.exports = Film;
