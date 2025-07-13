import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true },
  });
  res.json(users);
});

export default router;
