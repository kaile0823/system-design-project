// backend/models/item.js

import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbSqlite.js'; // 使用具名匯入

const Item = sequelize.define('Item', {
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    image_url: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    stock: { type: DataTypes.INTEGER, allowNull: false },
});

export default Item;