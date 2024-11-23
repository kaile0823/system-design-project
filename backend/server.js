import express from 'express'; // 替換 require 為 import
import { sequelize } from './config/dbSqlite.js'; // 使用具名匯入
import itemRoutes from './routes/itemRoutes.js'; // 替換路由為 ESM

const app = express(); // 初始化 Express 應用

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

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});