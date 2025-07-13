import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { PrismaClient } from './generated/prisma/index.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());



app.use('/api', authRoutes);
app.use('/allusers', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
