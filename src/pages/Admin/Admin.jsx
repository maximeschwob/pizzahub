import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext"; // Assure-toi que tu as le bon chemin

const AdminPage = () => {
    
  const { user } = useAuth();
  const navigate = useNavigate();

  const [pizzas, setPizzas] = useState([]);
  const [newPizza, setNewPizza] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    size: "L", // Ajoutez la taille avec une valeur par défaut
  });

  // Redirection si non-authentifié ou non-admin
  useEffect(() => {
    if (user === null) return;  // Assurez-vous que `user` est défini avant d'effectuer des vérifications

    if (user && user.role !== "admin") {
      navigate("/");
    } else if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Charger les pizzas
  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pizzas", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setPizzas(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des pizzas :", error);
      }
    };

    fetchPizzas();
  }, []);

  // Ajouter une pizza
const handleAddPizza = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/pizza", newPizza, {
        headers: {
          "Content-Type": "application/json", // Assurer que le Content-Type est bien défini en JSON
        },
      });
      setPizzas([...pizzas, response.data]);
      setNewPizza({ name: "", description: "", price: "", imageUrl: "", size: "l" }); // Fixer la taille à "l"
      alert("Pizza ajoutée !");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la pizza :", error);
      alert("Échec de l'ajout de la pizza.");
    }
  };
  

  // Supprimer une pizza
  const handleDeletePizza = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette pizza ?")) {
      try {
        await axios.delete(`http://localhost:3000/deletePizza/${id}`, {
          headers: {
            "Content-Type": "application/json", // Assurer que le Content-Type est bien défini
          },
        });
        setPizzas(pizzas.filter((pizza) => pizza._id !== id));
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Échec de la suppression.");
      }
    }
  };

  return (
    <div>
      <h1>Admin - Gestion des Pizzas</h1>

      {/* Formulaire pour ajouter une pizza */}
      <form onSubmit={handleAddPizza}>
        <input
          type="text"
          placeholder="Nom"
          value={newPizza.name}
          onChange={(e) => setNewPizza({ ...newPizza, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newPizza.description}
          onChange={(e) => setNewPizza({ ...newPizza, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Prix"
          value={newPizza.price}
          onChange={(e) => setNewPizza({ ...newPizza, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="URL de l'image"
          value={newPizza.imageUrl}
          onChange={(e) => setNewPizza({ ...newPizza, imageUrl: e.target.value })}
          required
        />
        {/* Champ de sélection pour la taille */}
        <select
          value={newPizza.size}
          onChange={(e) => setNewPizza({ ...newPizza, size: e.target.value })}
        >

          <option value="L">large</option>
     
        </select>
        <button type="submit">Ajouter Pizza</button>
      </form>

      {/* Liste des pizzas */}
      <div>
        <h2>Liste des Pizzas</h2>
        {pizzas.map((pizza) => (
          <div key={pizza._id}>
            <h3>{pizza.name}</h3>
            <p>{pizza.description} - {pizza.price}€</p>
            <p>Taille: {pizza.size}</p> {/* Affichage de la taille */}
            <img src={pizza.image} alt={pizza.name} width="100" />
            <button onClick={() => handleDeletePizza(pizza._id)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
