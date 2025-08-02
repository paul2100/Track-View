import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';

export async function register(req, res) {
  const { name, email, password } = req.body;

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email déjà utilisé' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword }
    });

    res.status(201).json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur technique !' });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return res.status(401).json({ error: 'Mot de passe incorrect' });

  const token = jwt.sign(
    { id: user.id, email: user.email, createdAt: user.createdAt },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 3600000
  });

  res.status(200).json({ success: true });
}

export function logout(req, res) {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'Strict'
  });

  res.status(200).json({ success: true });
}

export function getMe(req, res) {
  res.json({
    id: req.user.id,
    email: req.user.email,
    createdAt: req.user.createdAt
  });
}

