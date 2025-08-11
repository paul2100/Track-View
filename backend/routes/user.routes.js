import express from 'express';
import {getUser , updateUserProfile} from '../controllers/user.controller.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = express.Router();

router.get('/getUser', authenticateToken, getUser);
router.patch('/updateUserProfile/:id' , authenticateToken , updateUserProfile);


export default router;