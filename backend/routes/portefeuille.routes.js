import express from 'express';
import {getPortefeuille , createPortefeuille} from '../controllers/portefeuille.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();

router.get('/getportefeuille', authenticateToken, getPortefeuille);
router.post('/createPortefeuille', authenticateToken, createPortefeuille);


export default router;