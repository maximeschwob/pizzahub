
    import React from "react";
    import "./AboutUs.css";
    import pizzaImage from "../../../public/images/pizzeria.jpg.png"; // Make sure the image is in the correct folder
    
    export default function AboutUs() {
      return (
        <div className="about-container">
          <h1>Welcome to  Bon Appetito 🍕</h1>
          <img src={pizzaImage} alt="Our Pizzeria" className="about-image" />
          <p>
            At <strong>PizzaHub</strong>, we craft handmade pizzas using fresh and
            high-quality ingredients. Our mission is to provide you with an
            authentic Italian experience full of delicious flavors.
          </p>
          <h2>Our Story 📜</h2>
          <p>
            Since 2015, we have been serving homemade pizzas with love.  
            Located in the heart of the city, our pizzeria has become a must-visit  
            spot for lovers of Italian cuisine.
          </p>
          <h2>Our Values ❤️</h2>
          <ul>
            <li>✔️ Fresh and high-quality ingredients</li>
            <li>✔️ Authentic Italian recipes</li>
            <li>✔️ Warm and friendly service</li>
          </ul>
        </div>
      );
    }
    
