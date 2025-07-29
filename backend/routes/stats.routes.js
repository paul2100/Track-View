import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import {getAverageTimeTrade , getSuccesRate , getTotalTrades , getMaxDrawdown , getLossTrade , getWinTrade , getMaxLost , getMaxWin , getCapitalHistory , getPnl , getRewardRisk , getPnlChart , getTradeClosedByDay , getTradeByPaire , getTradeByPaireResult , getLongShortByTrade} from '../controllers/stats.controller.js';

const router = express.Router();

router.get('/getAverageTimeTrade', authenticateToken, getAverageTimeTrade);
router.get('/getSuccesRate', authenticateToken, getSuccesRate);
router.get('/getTotalTrades', authenticateToken, getTotalTrades);
router.get('/getMaxDrawdown', authenticateToken, getMaxDrawdown);
router.get('/getWinTrade', authenticateToken, getWinTrade);
router.get('/getLossTrade', authenticateToken,  getLossTrade);
router.get('/getMaxWin', authenticateToken,  getMaxWin);
router.get('/getMaxLost', authenticateToken,  getMaxLost);
router.get('/getCapitalHistory', authenticateToken,  getCapitalHistory);
router.get('/getPnl', authenticateToken,  getPnl);
router.get('/getRewardRisk', authenticateToken,  getRewardRisk);
router.get('/getPnlChart', authenticateToken,  getPnlChart);
router.get('/getTradeClosedByDay', authenticateToken,  getTradeClosedByDay);
router.get('/getTradeByPaire', authenticateToken,  getTradeByPaire);
router.get('/getTradeByPaireResult', authenticateToken,  getTradeByPaireResult);
router.get('/getLongShortByTrade', authenticateToken,  getLongShortByTrade);






export default router;