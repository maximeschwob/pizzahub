
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    cart: [
        {
          name: String,
          price: Number,
          size: { type: String, default: "L" }, // Taille de la pizza
        },
      ],
      totalPrice: Number, // Prix total de la commande
      createdAt: { type: Date, default: Date.now },
    });

export const Order =mongoose.model('Order', orderSchema); // ✅ Utilisez ES6 export si vous importez avec import
