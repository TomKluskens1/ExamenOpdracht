// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RecipeItem.css';
const API_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [bio, setBio] = useState('');
  const [updatedBio, setUpdatedBio] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('bio');
    window.location.href = '/';
  };

  // Check if user is logged in
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/signup');
    }
  }, [navigate]);

  // Fetch user info and recipes from localStorage and backend
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');
    const storedBio = localStorage.getItem('bio');
    const storedUserId = localStorage.getItem('user_id');

    setUsername(storedUsername);
    setEmail(storedEmail);
    setBio(storedBio || 'Heeft nog geen bio');

    // Fetch user recipes
    const fetchRecipes = async () => {
      const userId = parseInt(storedUserId, 10);
      if (isNaN(userId)) {
        console.error('Gebruikers-ID is ongeldig. Probeer opnieuw in te loggen.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/recipes/user/${userId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.recipes) {
            setRecipes(data.recipes);
          } else {
            console.error('Recepten data is leeg of ongeldig.');
          }
        } else {
          console.error('Fout bij het ophalen van recepten:', response.statusText);
        }
      } catch (error) {
        console.error('Fout bij het ophalen van recepten:', error);
      }
    };

    fetchRecipes();
  }, []);

  // Handle bio change
  const handleBioChange = (e) => {
    setUpdatedBio(e.target.value);
  };

  // Enable bio edit mode
  const handleEditBio = () => {
    setEditMode(true);
    setUpdatedBio(bio);
  };

  // Handle bio update
  const handleUpdateBio = async (e) => {
    e.preventDefault();

    const userId = parseInt(localStorage.getItem('user_id'), 10);
    if (isNaN(userId)) {
      alert('Gebruikers-ID ontbreekt of is ongeldig. Probeer opnieuw in te loggen.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/user/bio`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          bio: updatedBio,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Bio succesvol bijgewerkt!');
        localStorage.setItem('bio', updatedBio);
        setBio(updatedBio);
        setEditMode(false);
      } else {
        alert(data.message || 'Bio bijwerken mislukt.');
      }
    } catch (error) {
      console.error('Fout bij het bijwerken van de bio:', error);
      alert('Er is iets misgegaan, probeer het later opnieuw.');
    }
  };

  return (
    <div className="dashboard">
      <h1>Welkom, {username}!</h1>
      <p>Email: {email}</p>
      <p>Bio: {bio}</p>

      {editMode ? (
        <form onSubmit={handleUpdateBio}>
          <div>
            <label htmlFor="bio">Update bio:</label>
            <textarea
              id="bio"
              value={updatedBio}
              onChange={handleBioChange}
              placeholder="Vertel iets over jezelf..."
            />
          </div>
          <button type="submit">Update Bio</button>
        </form>
      ) : (
        <button onClick={handleEditBio}>Bio bewerken</button>
      )}

      <h2>Jouw Recepten</h2>
      {recipes.length > 0 ? (
        <div className="recipes-container">
          {recipes.map((recipe) => (
            <div key={recipe.recipe_id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              {/* Voeg hier meer velden toe indien gewenst, zoals ingrediënten of instructies */}
            </div>
          ))}
        </div>
      ) : (
        <p>Heeft nog geen recepten</p>
      )}

      <button onClick={handleLogout} className="logout-btn">
        Afmelden
      </button>
    </div>
  );
};

export default Dashboard;
