
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbSqlite.js';
import ProductSqliteModel from './productSqliteModel.js';

const CartSqliteModel = sequelize.define('Cart', {
    user_id: { type: DataTypes.INTEGER },
    item_id: { type: DataTypes.INTEGER },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
});


CartSqliteModel.belongsTo(ProductSqliteModel, { foreignKey: 'item_id', as: 'Product' });

export default CartSqliteModel;