// models/userSqliteModel.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbSqlite.js';

export const UserSqlite = sequelize.define('User', {
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

UserSqlite.sync({ alter: true })
  .then(() => {
    console.log('SQLite table (Users) synced successfully.');
  })
  .catch(error => {
    console.error('Error syncing SQLite table:', error);
  });

export default UserSqlite;