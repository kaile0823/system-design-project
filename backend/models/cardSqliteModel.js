
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbSqlite.js';
import UserSqliteModel from './userSqliteModel.js';

const CardSqliteModel = sequelize.define('Card', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: UserSqliteModel, key: 'id' },
    },
    no: { type: DataTypes.STRING, allowNull: false },
    expiryDate: { type: DataTypes.STRING, allowNull: false },
    cardType: { type: DataTypes.STRING, allowNull: true }, // e.g., 'Visa', 'MasterCard'
});

// Define User hasMany Cards relationship
UserSqliteModel.hasMany(CardSqliteModel, { foreignKey: 'user_id', as: 'wallet' });
CardSqliteModel.belongsTo(UserSqliteModel, { foreignKey: 'user_id' });

export default CardSqliteModel;