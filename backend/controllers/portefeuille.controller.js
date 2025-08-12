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


export async function updatePortefeuille(req, res) {
  try {
    const userId = req.user.id;
    const { currency, leverage, risk_per_trade, solde_initial } = req.body;

    const portefeuille = await prisma.portefeuille.findUnique({
      where: { userId },
    });

    if (!portefeuille) {
      return res.status(404).json({
        success: false,
        error: `Aucun portefeuille trouvé pour cet utilisateur.`,
      });
    }

    const dataToUpdate = {
      currency,
      leverage: parseFloat(leverage),
      risk_per_trade: parseFloat(risk_per_trade),
    };

    if (Number(portefeuille.capital_actuel) === Number(portefeuille.solde_initial) && solde_initial !== undefined) {
      dataToUpdate.solde_initial = Number(solde_initial);
      dataToUpdate.capital_actuel = Number(solde_initial);
    }

    const updatedPortefeuille = await prisma.portefeuille.update({
      where: { userId },
      data: dataToUpdate,
    });

    return res.status(200).json({ success: true, portefeuille: updatedPortefeuille });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Erreur serveur' });
  }
}




export const getPortefeuille = async (req, res) => {
  try {
    const portefeuille = await prisma.portefeuille.findUnique({
      where: {
        userId: req.user.id 
      },
      select: {
        id: true,
        currency: true,
        leverage: true,
        risk_per_trade: true,
        solde_initial: true,
        capital_actuel: true
      },
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


