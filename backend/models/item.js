const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Item = sequelize.define('Item', {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    image_url: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    stock: { type: DataTypes.INTEGER, allowNull: false }
});

module.exports = Item;