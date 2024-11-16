
import app from './app.js';

// const PORT = process.env.PORT || 3002;
const PORT = 3002;
// backend/server.js

const express = require('express');
const app = express();
const sequelize = require('./config/db'); // 資料庫連線配置
const itemRoutes = require('./routes/itemRoutes'); // 引入路由文件

app.use(express.json()); // 使用中介軟體解析 JSON 請求

// 使用路由
app.use('/api', itemRoutes); // 所有 /api 的請求會轉交給 itemRoutes

// 同步資料庫
sequelize.sync({ force: false }) // 設置為 true 將重置資料表，開發時慎用
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => {
        console.error('Error syncing database:', error);
    });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
