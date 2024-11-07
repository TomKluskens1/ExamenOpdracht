import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RecipeItem.css'; // Zorg ervoor dat je de CSS aanpast naar je stijlbestand

const RecipeItem = ({ recipe }) => {
  const navigate = useNavigate();

  // Deze functie navigeert naar de details-pagina van het recept wanneer erop wordt geklikt
  const handleClick = () => {
    navigate(`/recipe/${recipe.recipe_id}`); // Navigeer naar de details van het recept
  };

  return (
    <div className="recipe-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={recipe.image_url} alt={recipe.title} className="recipe-image" />
      <div className="recipe-content">
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
      </div>
    </div>
  );
};

export default RecipeItem;
