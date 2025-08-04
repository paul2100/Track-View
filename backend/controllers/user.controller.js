import prisma from '../prisma/client.js';


export async function getUser(req , res) {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            email:true,
            createdAt: true,
        },
    })

    return res.status(200).json({succes: true , user})
}