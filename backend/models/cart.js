// backend/models/cart.js

import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbSqlite.js'; // 使用具名匯入
import ProductSqlite from './productSqliteModel.js'; // 匯入 ProductSqlite 模型
import Item from './item.js';
import User from './user.js';

const Cart = sequelize.define('Cart', {
    user_id: {
        type: DataTypes.INTEGER,
        references: { model: User, key: 'id' }
    },
    item_id: {
        type: DataTypes.INTEGER,
        references: { model: Item, key: 'id' }
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
});

Cart.belongsTo(User, { foreignKey: 'user_id' });
Cart.belongsTo(Item, { foreignKey: 'item_id' });
Cart.belongsTo(ProductSqlite, { foreignKey: 'item_id' });

export default Cart;