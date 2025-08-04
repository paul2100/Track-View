import express from 'express';
import {getUser} from '../controllers/user.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();

router.get('/getUser', authenticateToken, getUser);


export default router;