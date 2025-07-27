import express from 'express';
import {createTradeJournal , getAllJournaux , getJournalById , deleteJournalById , updateJournalById} from '../controllers/journal.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import multer from 'multer';


const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/createTradeJournal', authenticateToken, upload.array('images', 2), createTradeJournal);
router.get('/getAllJournaux', authenticateToken, getAllJournaux);
router.get('/getJournalById/:id', authenticateToken, getJournalById);
router.delete('/deleteJournalById/:id', authenticateToken, deleteJournalById);
router.patch('/updateJournalById/:id', authenticateToken, upload.any(), updateJournalById);







export default router;