import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Assurez-vous que App.jsx est bien dans le même dossier
import './index.css';  // Si vous avez des styles globaux
import { BrowserRouter,Route,Routes } from 'react-router-dom';

import NavBar from './components/Navbar/NavBar';
import Footer from './components/Footer/Footer';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <BrowserRouter>
    <NavBar/>
    <App/>
      <Footer/>
      
    </BrowserRouter>
    
  </React.StrictMode>
);
