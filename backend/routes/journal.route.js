import express from 'express';
import {createTradeJournal , getAllJournaux} from '../controllers/journal.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import multer from 'multer';


const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/createTradeJournal', authenticateToken, upload.single('image'), createTradeJournal);
router.get('/getAllJournaux', authenticateToken, getAllJournaux);


export default router;