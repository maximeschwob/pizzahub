import { Order } from '../models/order.js';


import { serverResponse } from '../utils/serverResponse.js';

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('pizzas'); // ✅ Remplit les infos de la pizza
    console.log(orders)
    if (orders.length === 0) {
      return serverResponse(res, 204, 'Aucune commande trouvée');
    }

    serverResponse(res, 200, orders); // ✅ Retourne les commandes trouvées
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    serverResponse(res, 500, 'Erreur lors de la récupération des commandes');
  }
};
export const addOrderController = async (req, res) => {
  try {
    // Récupérer les données envoyées dans la requête
    const { cart, totalPrice } = req.body;

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: "Le panier est vide." });
    }

    // Créer une nouvelle commande
    const newOrder = new Order({
      cart,
      totalPrice,
    });

    // Sauvegarde dans la base de données
    await newOrder.save();

    return res.status(201).json({ message: "Commande ajoutée avec succès", order: newOrder });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la commande:", error);
    return res.status(500).json({ message: "Erreur interne du serveur" });
  }
};
