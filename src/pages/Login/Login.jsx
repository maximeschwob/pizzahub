import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null); // Pour afficher les erreurs si elles surviennent
  const [success, setSuccess] = useState(null); // Pour afficher un message de succès
  const navigate = useNavigate(); // Utilisé pour la redirection après la connexion

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Fonction pour soumettre le formulaire et se connecter
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('User logged in:', response.data);
        setSuccess('Login successful!');
        setError(null); // Réinitialiser les erreurs
        localStorage.setItem('authToken', response.data.token); // Sauvegarde du token d'authentification
        setTimeout(() => {
          navigate('/'); // Redirige l'utilisateur vers la page du tableau de bord (ou une autre page)
        }, 2000);
      } else {
        setError(response.data.message || 'Unknown error');
        setSuccess(null);
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Error during login. Please try again.');
      } else {
        setError('Server is not responding. Please try again later.');
      }
      setSuccess(null);
    }
  };

  return (
    <div className="signin-container">
      <h1>Login</h1>

      {/* Affichage des messages d'erreur ou de succès */}
      {success && <div className="success">{success}</div>}
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
