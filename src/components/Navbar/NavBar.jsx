import "./NavBar.css";
import React from "react";
import logo from "/images/bon.jpg";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="PizzaHub Logo" className="logo-image" />
        </div>
        <h1 className="navbar-logo">Bon appetito</h1>

        <ul className="navbar-links">
          <li>
            <ul className="navbar-links">
              <li>
                <div className="navbar-link">
                  <div
                    className="navbar-link"
                    onClick={() => navigate("/about-us")}
                    style={{ cursor: "pointer" }}
                  >
                    About Us
                  </div>
                </div>
              </li>
              <li>
                <div
                  className="navbar-link"
                  onClick={() => navigate("/order")}
                  style={{ cursor: "pointer" }}
                >
                  Order
                </div>
              </li>
              
              <li>
                <div
                  className="navbar-link"
                  onClick={() => navigate("/Login")}
                  style={{ cursor: "pointer" }}
                >
          Login
                </div>
              </li>
              <li>
                <div
                  className="navbar-link"
                  onClick={() => navigate("/Register")}
                  style={{ cursor: "pointer" }}
                >
               Register
                </div>
              </li>
              <li>
                <div
                  className="navbar-link"
                  onClick={() => navigate("/")}
                  style={{ cursor: "pointer" }}
                >
                  Home
                </div>
              </li>
              <li>
                <div
                  className="navbar-link"
                  onClick={() => navigate("/Admin")}
                  style={{ cursor: "pointer" }}
                >
                 Admin
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
