import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage.jsx";
import OrderPage from "./pages/OrderPage/OrderPage.jsx";
import CreateUser from "./pages/CreateUser/CreateUser.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import Login from "./pages/Login/Login.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import { AuthProvider, useAuth } from "./AuthContext.jsx"; // ✅ Import correct

// 🔐 Composant pour protéger les routes
const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Login />;
};

function App() {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Ajouter une pizza au panier
  const handleAddToCart = (pizza, size = "L") => {
    const newPizza = { ...pizza };
    if (size === "XL") {
      newPizza.price = pizza.price * 1.1;
    }
    setCart([...cart, newPizza]);
  };

  // Vider le panier
  const handleClearCart = () => {
    setCart([]);
  };

  // Calcul du total
  useEffect(() => {
    setTotalPrice(cart.reduce((total, pizza) => total + pizza.price, 0));
  }, [cart]);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage handleAddToCart={handleAddToCart} />} />
        <Route
          path="/order"
          element={<OrderPage cart={cart} totalPrice={totalPrice} handleClearCart={handleClearCart} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CreateUser />} />
        <Route path="/about-us" element={<AboutUs />} />
      
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
