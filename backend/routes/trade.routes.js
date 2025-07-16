import express from 'express';
import {getTotalTrades , createTrade , updateTrade , getAllTrades} from '../controllers/trade.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();


router.get('/getTotalTrades', authenticateToken, getTotalTrades);
router.post('/createTrade', authenticateToken, createTrade);
router.patch('/updateTrade/:id', authenticateToken, updateTrade);
router.get('/getAllTrades', authenticateToken, getAllTrades);

export default router;