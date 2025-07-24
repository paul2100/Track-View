import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import portefeuilleRoutes from './routes/portefeuille.routes.js';
import tradeRoutes from './routes/trade.routes.js';
import statsRoutes from './routes/stats.routes.js';
import journalRoutes from './routes/journal.route.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/trade', tradeRoutes);
app.use('/api/portefeuille', portefeuilleRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/journal', journalRoutes);



export default app;
