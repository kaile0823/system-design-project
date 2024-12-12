
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbSqlite.js';

export const UserSqliteModel = sequelize.define('User', {
  uname: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  admin: { type: DataTypes.BOOLEAN, defaultValue: false },
  address: {type: DataTypes.JSON, allowNull: false},
});

export default UserSqliteModel;