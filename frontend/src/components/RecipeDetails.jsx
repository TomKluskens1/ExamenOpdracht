import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRecipeById } from '../api/api';
import '../styles/RecipeDetails.css';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecipe = async () => {
      try {
        const data = await fetchRecipeById(id);
        setRecipe(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="recipeD-details-container">
      <img src={recipe.image_url} alt={recipe.title} className="recipeD-image" />
      <div className="recipeD-content">
        <h1 className="recipeD-title">{recipe.title}</h1>
        <p className="recipeD-description">{recipe.description}</p>
        <h2 className="recipeD-section-title">Ingredients</h2>
        <div className="recipeD-ingredients">
          <ul>
            {JSON.parse(recipe.ingredients).map((ingredient, index) => (
              <li key={index}>
                {ingredient.ingredient} - {ingredient.amount}
              </li>
            ))}
          </ul>
        </div>
        <h2 className="recipeD-section-title">Instructions</h2>
        <div className="recipeD-instructions">
          <ol>
            {recipe.instructions.split(/\d+\.\s*/).filter((step) => step.trim() !== '').map((step, index) => (
              <li key={index}>{step.trim()}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
