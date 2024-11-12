// models/userSqliteModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbSqlite.js';

export const ProductSqlite = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    images: { type: DataTypes.JSON, allowNull: true },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    ratingScore: { type: DataTypes.INTEGER, allowNull: false },
    ratingCount: { type: DataTypes.INTEGER, allowNull: false },
});

ProductSqlite.sync({ alter: true })
    .then(() => {
        console.log('SQLite table (Users) synced successfully.');
    })
    .catch(error => {
        console.error('Error syncing SQLite table:', error);
    });

export default ProductSqlite;