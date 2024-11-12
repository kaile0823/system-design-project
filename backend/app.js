
import express from 'express';
import cors from 'cors';

import { connectMongoDB } from './config/dbMongo.js';
import { connectSqlite } from './config/dbSqlite.js';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import settingsRoutes from './routes/settingRoutes.js';

const app = express();

// Connect to databases
// connectMongoDB();
connectSqlite();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', settingsRoutes);

export default app;
