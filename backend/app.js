
import express from 'express';
import cors from 'cors';

import { connectMongoDB } from './config/dbMongo.js';
import { connectSqlite } from './config/dbSqlite.js';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

const app = express();

// Connect to databases
// connectMongoDB();
connectSqlite();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/img", express.static('img'));

// Routes
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', settingRoutes);
app.use('/api', imageRoutes);

export default app;
