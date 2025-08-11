import { profile } from 'console';
import prisma from '../prisma/client.js';

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
          }
        }
      }
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
    const {email , password , experience , goalReturn , language , timezone , tradingStyle , username} = req.body;
    

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        email: true,
        password: true,
        profile: {
          select: {
            experience: true,
            goalReturn: true,
            language: true,
            timezone: true,
            tradingStyle: true,
            username: true
          },
        },
      },
    });


    if (!user) {
      return res.status(404).json({ success: false, error: 'Utilisateur non trouvé' });
    }


    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: {
        email,
        password,
        profile: {
          update: {
            experience,
            goalReturn,
            language,
            timezone,
            tradingStyle,
            username
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
