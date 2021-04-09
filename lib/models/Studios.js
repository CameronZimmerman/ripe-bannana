const { DataTypes, Model } = require('sequelize');
const db = require('../utils/db');

class Studio extends Model { }

Studio.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        city: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },    
    },
    { sequelize: db, timestamps: false }
)

module.exports = Studio;