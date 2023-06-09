const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Album = sequelize.define('album', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    releaseYear: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    //artistId
});

module.exports = Album;