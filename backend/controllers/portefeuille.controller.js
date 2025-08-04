import prisma from '../prisma/client.js';


export async function createPortefeuille(req, res) {
  const user = req.user.id;
  const { solde_initial , currency , leverage , risk_per_trade } = req.body;
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
      solde_initial: Number(solde_initial),
      currency: currency,
      leverage: Number(leverage),
      risk_per_trade: Number(risk_per_trade), 
      capital_actuel: capital_actuel,
    },
  });

  return res.status(201).json({ succes: true, portefeuille });
}




export const getPortefeuille = async (req, res) => {
  try {
    const portefeuille = await prisma.portefeuille.findUnique({
      where: { userId: req.user.id }
    });

    if (!portefeuille) {
      return res.status(404).json({ error: 'Aucun portefeuille trouvé' });
    }

    return res.status(200).json({ portefeuille });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};


