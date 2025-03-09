import './OrderPage.css';
import React from 'react';
import axios from 'axios';

const OrderPage = ({ cart, totalPrice, handleClearCart }) => {
  
  const handleCheckout = async () => {
    // Vérifier que le panier n'est pas vide
    if (cart.length === 0) {
      alert("Votre panier est vide !");
      return;
    }

    const orderData = {
      cart: cart.map(pizza => ({
        name: pizza.name,
        price: pizza.price,
        size: pizza.size || "L",
      })),
      totalPrice,
    };

    console.log("Données envoyées :", orderData);

    try {
      const response = await axios.post("http://localhost:3000/newOrder", orderData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Réponse du serveur :", response.data);

      if (response.status === 201) {
        handleClearCart();
        alert("Commande passée avec succès !");
      }
    } catch (error) {
      console.error("Erreur complète :", error.response || error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <h1>Finaliser votre commande</h1>
      <ul>
        {cart.map((pizza, index) => (
          <li key={index}>
            {pizza.name} - ${pizza.price}
          </li>
        ))}
      </ul>
      <h2>Total: ${totalPrice}</h2>
      <button onClick={handleCheckout}>Confirmer la commande</button>
    </div>
  );
};

export default OrderPage;
