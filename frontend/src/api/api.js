// src/api/api.js
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Haal alle recepten op
export const fetchRecipes = async () => {
  const response = await fetch(`${API_URL}/recipes`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  return response.json();
};

// Haal een specifiek recept op
export const fetchRecipeById = async (id) => {
  const response = await fetch(`${API_URL}/recipes/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch recipe with id ${id}`);
  }
  return response.json();
};

// Voeg een nieuw recept toe
export const addRecipe = async (recipeData) => {
  const response = await fetch(`${API_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipeData),
  });
  if (!response.ok) {
    throw new Error('Failed to add recipe');
  }
  return response.json();
};

// Bewerk een bestaand recept
export const updateRecipe = async (id, updatedData) => {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error('Failed to update recipe');
  }
  return response.json();
};

// Verwijder een recept
export const deleteRecipe = async (id) => {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete recipe');
  }
  return response.json();
};

// Like een recept
export const likeRecipe = async (id) => {
  const response = await fetch(`${API_URL}/recipes/${id}/like`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to like recipe');
  }
  return response.json();
};

// Deel een recept
export const shareRecipe = async (id) => {
  const response = await fetch(`${API_URL}/recipes/${id}/share`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Failed to share recipe');
  }
  return response.json();
};
