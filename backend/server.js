import express from 'express';
import dotenv from 'dotenv';
import bcrypt, { hashSync } from 'bcrypt';
import cors from 'cors';
import { PrismaClient } from './generated/prisma/index.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { authenticateToken } from './middlewares/authenticateToken.js';


dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());


app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const uniqueUserEmail = await prisma.user.findUnique({
      where: { email }
    });

    if (uniqueUserEmail) {
      return res.status(400).json({ Error: 'Erreur : email existe déjà !' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    return res.status(201).json({ Status: 'Success', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: 'Erreur technique !' });
  }
});


app.post('/login' , async (req , res) => {
  const {email , password} = req.body;

  const user = await prisma.user.findUnique({
  where: { email }
  });

  if (!user) {
    return res.status(404).json({ error: "Utilisateur non trouvé" });
  }

  const passwordMatch = await bcrypt.compare(password , user.password);

  if (!passwordMatch) {
    return res.status(401).json({error: 'Mot de pass incorecte'});
  }

  const token = jwt.sign(
    {id: user.id , email: user.email},
    process.env.JWT_SECRET,
    {expiresIn: '1h'}
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'lax', 
    maxAge: 3600000 
  });

  return res.status(200).json({ success: true });

});


app.post('/logout', (req , res) => {
  res.clearCookie('token' , {
    httpOnly: true,
    secure: false,
    sameSite: 'Strict',
  });
  res.status(200).json({ succes: true});
})



app.get('/me', authenticateToken, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email , createdAt: req.user.createdAt});
});





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});