const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Item = require('./item');
const User = require('./user');

const Cart = sequelize.define('Cart', {
    user_id: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' }
    },
    item_id: {
        type: DataTypes.INTEGER,
        references: { model: Item, key: 'id' }
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false }
});

// 關聯
Cart.belongsTo(User, { foreignKey: 'user_id' });
Cart.belongsTo(Item, { foreignKey: 'item_id' });

module.exports = Cart;