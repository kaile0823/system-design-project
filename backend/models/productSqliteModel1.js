import { DataTypes } from 'sequelize';
import { sequelize1 } from '../config/dbSqlite.js';

export const ProductSqliteModel1 = sequelize1.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    ratingScore: { type: DataTypes.INTEGER, defaultValue: 0 },
    ratingCount: { type: DataTypes.INTEGER, defaultValue: 0 },
});

export default ProductSqliteModel1;