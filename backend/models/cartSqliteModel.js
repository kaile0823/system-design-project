
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbSqlite.js';
import ProductSqliteModel from './productSqliteModel.js';
import UserSqliteModel from './userSqliteModel.js';

const CartSqliteModel = sequelize.define('Cart', {
    user_id: {
        type: DataTypes.INTEGER,
        references: { model: ProductSqliteModel, key: 'id' }
    },
    item_id: {
        type: DataTypes.INTEGER,
        references: { model: UserSqliteModel, key: 'id' }
    },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
});

CartSqliteModel.belongsTo(UserSqliteModel, { foreignKey: 'user_id' });
CartSqliteModel.belongsTo(ProductSqliteModel, { foreignKey: 'item_id' });

export default CartSqliteModel;