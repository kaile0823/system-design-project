import app from "./app.js";
import dotenv from "dotenv";
import cartSqliteModel from './models/cartSqliteModel.js';
import productSqliteModel from './models/productSqliteModel.js';

dotenv.config();

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

