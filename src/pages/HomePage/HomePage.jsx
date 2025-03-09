import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./HomePage.css";

export default function HomePage({ handleAddToCart }) {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0); // Suivi du nombre de pizzas dans le panier
  const [confirmationMessage, setConfirmationMessage] = useState(""); // Message de confirmation

  // Fonction pour ajouter une pizza au panier et afficher le message
  const handlePizzaSelect = (pizza) => {
    setCartCount(cartCount + 1); // Incrémenter le nombre de pizzas dans le panier
    handleAddToCart(pizza, "L"); // Ajouter la pizza (taille 'L' par exemple)
    
    // Afficher un message de confirmation
    setConfirmationMessage(`Added ${pizza.name} to your cart!`);

    // Cacher le message après 2 secondes
    setTimeout(() => {
      setConfirmationMessage(""); // Supprimer le message après un délai
    }, 2000); // 2000 ms = 2 secondes
  };


  
  // 🔹 Alerte dès l'arrivée sur la page
  useEffect(() => {
    const hasSeenAlert = localStorage.getItem("hasSeenAuthAlert");
  
    if (!hasSeenAlert) {
      const choice = window.confirm("You need to sign up or log in. Do you want to register?");
      
      localStorage.setItem("hasSeenAuthAlert", "true"); // Enregistrer que l'alerte a été vue
  
      if (choice) {
        navigate("/register");
      } else {
        navigate("/login");
      }
    }
  }, [navigate]);
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pizzas");
        setPizzas(response.data);
      } catch (err) {
        console.error("Error loading pizzas:", err);
        setError("Unable to fetch pizzas.");
      } finally {
        setLoading(false);
      }
    };

    fetchPizzas();
  }, []);

  const filteredPizzas = pizzas.filter((pizza) =>
    pizza.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="menu-title-container">
        <h1 className="menu-title">Our Pizzas</h1>
      </div>
      
      <input
        type="text"
        placeholder="Search pizza..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="menu-container">
        {filteredPizzas.map((pizza, index) => (
          <div key={index} className="pizza-card">
            <img src={pizza.image} alt={`Pizza ${pizza.name}`} className="pizza-image" />
            <p className="image-alt">{`Image description: ${pizza.name}`}</p>
            <span className="pizza-info">
              {pizza.name} - {pizza.description} <br />
              {pizza.price} sh
            </span>
            
            <button onClick={() => handleAddToCart(pizza, "L")} className="size-button">L</button>
            <button onClick={() => handleAddToCart(pizza, "XL")} className="size-button">XL</button>
          </div>
        ))}
      </div>
    </div>
  );
}
