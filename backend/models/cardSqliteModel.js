
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbSqlite.js';

const CardSqliteModel = sequelize.define('Card', {
    no: { type: DataTypes.STRING, allowNull: false },
    expiryDate: { type: DataTypes.STRING, allowNull: false },
    cardType: { type: DataTypes.STRING, allowNull: true }, // e.g., 'Visa', 'MasterCard'
});

export default CardSqliteModel;