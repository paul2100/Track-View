import express from 'express';
import {createTrade , updateTrade , getAllTrades , getTradeById , deleteTradeById} from '../controllers/trade.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();


router.post('/createTrade', authenticateToken, createTrade);
router.patch('/updateTrade/:id', authenticateToken, updateTrade);
router.get('/getAllTrades', authenticateToken, getAllTrades);
router.get('/getTradeById/:id', authenticateToken, getTradeById);
router.delete('/deleteTradeById/:id', authenticateToken, deleteTradeById);

export default router;