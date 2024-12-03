
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbSqlite.js';

export const ProductSqliteModel = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    ratingScore: { type: DataTypes.INTEGER, defaultValue: 0 },
    ratingCount: { type: DataTypes.INTEGER, defaultValue: 0 },
});

export default ProductSqliteModel;