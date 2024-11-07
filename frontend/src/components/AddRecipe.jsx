// src/components/AddRecipe.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AddRecipe.css';

const AddRecipe = () => {
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [amount, setAmount] = useState('');
  const [instruction, setInstruction] = useState('');
  const navigate = useNavigate();

  // Controleer of de gebruiker is ingelogd, anders doorverwijzen naar de loginpagina
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/signup');
    }
  }, [navigate]);

  const handleAddIngredient = () => {
    if (ingredient && amount) {
      setIngredients([...ingredients, { ingredient, amount }]);
      setIngredient('');
      setAmount('');
    }
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleAddInstruction = () => {
    if (instruction) {
      setInstructions([...instructions, instruction]);
      setInstruction('');
    }
  };

  const handleRemoveInstruction = (index) => {
    const updatedInstructions = [...instructions];
    updatedInstructions.splice(index, 1);
    setInstructions(updatedInstructions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = parseInt(localStorage.getItem('user_id'), 10);
    if (isNaN(userId)) {
      alert('Gebruikers-ID ontbreekt of is ongeldig. Probeer opnieuw in te loggen.');
      return;
    }

    const recipeData = {
      user_id: userId,
      title,
      description,
      ingredients: JSON.stringify(ingredients),
      instructions: instructions.join('. '),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        alert('Recept succesvol toegevoegd!');
        navigate('/dashboard');
      } else {
        alert('Er ging iets mis bij het toevoegen van het recept. Probeer het opnieuw.');
      }
    } catch (error) {
      console.error('Fout bij het toevoegen van het recept:', error);
      alert('Er is iets misgegaan, probeer het later opnieuw.');
    }
  };

  return (
    <div className="add-recipe">
      <h1>Voeg een nieuw recept toe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Titel:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Beschrijving:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ingrediënten:</label>
          <div className="ingredient-inputs">
            <input
              type="text"
              placeholder="Ingrediënt"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />
            <input
              type="text"
              placeholder="Hoeveelheid"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button type="button" onClick={handleAddIngredient}>
              Voeg toe
            </button>
          </div>
          <ul>
            {ingredients.map((ing, index) => (
              <li key={index}>
                {ing.ingredient} - {ing.amount}
                <button type="button" onClick={() => handleRemoveIngredient(index)}>
                  Verwijder
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <label>Instructies:</label>
          <div className="instruction-inputs">
            <input
              type="text"
              placeholder="Instructie"
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
            />
            <button type="button" onClick={handleAddInstruction}>
              Voeg toe
            </button>
          </div>
          <ul>
            {instructions.map((inst, index) => (
              <li key={index}>
                {inst}
                <button type="button" onClick={() => handleRemoveInstruction(index)}>
                  Verwijder
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Voeg Recept Toe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
