const { Model, DataTypes } = require('sequelize');
const db = require('../utils/db');

class Reviews extends Model { }

Reviews.init(
  {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 10 },
    },
    review: {
      type: DataTypes.TEXT(140),
      allowNull: false,
    },
  },
  { sequelize: db, timestamps: false }
);


module.exports = Reviews;
