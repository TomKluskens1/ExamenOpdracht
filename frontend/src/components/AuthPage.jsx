import React, { useState } from 'react';
import '../styles/AuthPage.css';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_BASE_URL;

const AuthPage = () => {
  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  // Register states
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerError, setRegisterError] = useState('');

  // Handle Login
  const handleLogin = async (event) => {
    event.preventDefault();

    if (!loginEmail || !loginPassword) {
      setLoginError('Email en wachtwoord zijn verplicht');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, navigate to another page (e.g., dashboard)
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user.id);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('email', data.user.email);
        localStorage.setItem('bio', data.user.bio);
        window.location.href = '/dashboard';
      } else {
        setLoginError(data.message || 'Inloggen mislukt. Probeer het opnieuw.');
      }
    } catch (error) {
      setLoginError('Er is iets misgegaan, probeer het later opnieuw.');
    }
  };

  // Handle Register
  const handleRegister = async (event) => {
    event.preventDefault();

    if (!registerUsername || !registerEmail || !registerPassword) {
      setRegisterError('Alle velden zijn verplicht');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerUsername,
          email: registerEmail,
          password: registerPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        alert('Registratie succesvol! U kunt nu inloggen.');
      } else {
        setRegisterError(data.message || 'Registratie mislukt. Probeer het opnieuw.');
      }
    } catch (error) {
      setRegisterError('Er is iets misgegaan, probeer het later opnieuw.');
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-page-content">
        {/* Login Section */}
        <div className="login-section">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="loginEmail"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="loginPassword"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-btn">Login</button>
          </form>
          {loginError && <p className="error-message">{loginError}</p>}
        </div>

        {/* Registration Section */}
        <div className="registration-section">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="register-username">Username</label>
              <input
                type="text"
                id="register-username"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="register-email">Email</label>
              <input
                type="email"
                id="register-email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="register-password">Password</label>
              <input
                type="password"
                id="register-password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-btn">Register</button>
          </form>
          {registerError && <p className="error-message">{registerError}</p>}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
