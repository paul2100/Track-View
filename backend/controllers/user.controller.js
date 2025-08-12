import prisma from '../prisma/client.js';
import bcrypt from 'bcrypt';

export async function getUser(req, res) {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        createdAt: true,
        profile: {
          select: {
            username: true,
            role: true,
            lastLogin: true,
            lastProfileUpdate: true,
            experience: true,
            language: true,
            timezone: true,
            tradingStyle: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
}


export async function updateUserProfile(req , res) {

  try {
    const userId = req.user.id;
    const {experience , language , timezone , tradingStyle , username} = req.body;
  
    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: {
        profile: {
          update: {
            experience,
            language,
            timezone,
            tradingStyle,
            username,
            lastProfileUpdate: new Date(),
          },
        },
      },
      include: {
        profile: true
      }
    });

    return res.status(200).json({success: true , updateUser: updateUser});



  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
}


