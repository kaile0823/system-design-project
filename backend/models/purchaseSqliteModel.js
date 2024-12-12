
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbSqlite.js';

const purchaseSqliteModel = sequelize.define('Purchase', {
    user_id: { type: DataTypes.INTEGER },
    item_id: { type: DataTypes.INTEGER },
    card_id: { type: DataTypes.INTEGER },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
});

export default purchaseSqliteModel;