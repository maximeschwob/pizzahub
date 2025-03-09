import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Création du contexte
const AuthContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Vérifie si l'utilisateur est déjà connecté (ex: après un refresh)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fonction pour se connecter
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      const loggedInUser = response.data;
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      return { success: true };
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message);
      return { success: false, message: error.response?.data?.message };
    }
  };

  // Fonction pour se déconnecter
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
