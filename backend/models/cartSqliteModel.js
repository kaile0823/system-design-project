
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbSqlite.js';

const CartSqliteModel = sequelize.define('Cart', {
    user_id: { type: DataTypes.INTEGER },
    item_id: { type: DataTypes.INTEGER },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
});

export default CartSqliteModel;