import React, { useEffect, useState } from 'react';
import RecipeItem from './RecipeItem';  // Importeer de RecipeItem component
import { fetchRecipes } from '../api/api.js';  // Importeer je API-aanroep voor het ophalen van recepten
import '../styles/RecipeList.css';  // Importeer de CSS-styling voor de lijst

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchRecipes();  // Haal recepten op uit de backend API
        setRecipes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  if (loading) return <p>Loading...</p>;  // Toon een laadbalkje tijdens het ophalen van de recepten
  if (error) return <p>Error: {error}</p>;  // Toon een foutmelding als er iets misgaat

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.recipe_id}  // Gebruik het recipe_id als unieke sleutel
          recipe={recipe}  // Geef het hele recept door aan RecipeItem
        />
      ))}
    </div>
  );
};

export default RecipeList;
