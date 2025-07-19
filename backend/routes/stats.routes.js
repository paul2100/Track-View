import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import {getAverageTimeTrade , getSuccesRate , getTotalTrades , getMaxDrawdown , getLossTrade , getWinTrade , getMaxLost , getMaxWin} from '../controllers/stats.controller.js';

const router = express.Router();

router.get('/getAverageTimeTrade', authenticateToken, getAverageTimeTrade);
router.get('/getSuccesRate', authenticateToken, getSuccesRate);
router.get('/getTotalTrades', authenticateToken, getTotalTrades);
router.get('/getMaxDrawdown', authenticateToken, getMaxDrawdown);
router.get('/getWinTrade', authenticateToken, getWinTrade);
router.get('/getLossTrade', authenticateToken,  getLossTrade);
router.get('/getMaxWin', authenticateToken,  getMaxWin);
router.get('/getMaxLost', authenticateToken,  getMaxLost);

export default router;