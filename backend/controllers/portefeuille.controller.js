import prisma from '../prisma/client.js';


export async function createPortefeuille(req, res) {
  const user = req.user.id;
  const { solde_initial } = req.body;
  const capital_actuel = solde_initial;

  if (solde_initial <= 0) {
    return res.status(400).json({ error: "Le solde initial doit être supérieur à 0" });
  }

  const portefeuilleDejaCree = await prisma.portefeuille.findUnique({
    where: { userId: user },
  });

  if (portefeuilleDejaCree) {
    return res.status(409).json({ error: "Portefeuille déjà existant !" });
  }

  const portefeuille = await prisma.portefeuille.create({
    data: {
      userId: user,
      solde_initial: solde_initial,
      capital_actuel: capital_actuel,
    },
  });

  return res.status(201).json({ succes: true, portefeuille });
}




export async function getPortefeuille(req , res) {
    const user = req.user.id;

    const portefeuille = await prisma.portefeuille.findUnique({ where: { userId: user }});

    if (!portefeuille) {
        res.status(404).json({error: "portefeuille non trouvé"});
    }

    res.status(200).json({succes: true , portefeuille});
}

