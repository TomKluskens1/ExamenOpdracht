// src/components/Header.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'; // Importeer de CSS
import logo from '../assets/logo.png'; // Importeer het logo

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Controleer of er een token in localStorage zit
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Verwijder items uit localStorage bij afmelden
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    navigate('/signup');
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Recipe Relay Logo" className="logo" />
      </div>
      <nav className="nav-links">
        <a href="/">Home</a>
        <a href="/addrecipe">Recept Uploaden</a>
        {isLoggedIn ? (
          <>
            <a href="/dashboard">{username}</a>
            
          </>
        ) : (
          <a href="/signup">Log in</a>
        )}
      </nav>
    </header>
  );
};

export default Header;
