// backend/models/user.js

import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbSqlite.js'; // 使用具名匯入

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true },
});

export default User; // 默認匯出