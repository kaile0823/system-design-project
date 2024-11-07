
import express from 'express';
import { connectMongoDB } from './config/dbMongo.js';
import { connectSqlite } from './config/dbSqlite.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

// Connect to databases
// connectMongoDB();
connectSqlite();

// Middleware
app.use(express.json());

// Routes
app.use('/api', userRoutes);

export default app;
