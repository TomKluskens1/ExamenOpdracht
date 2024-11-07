import { Context } from 'koa';
import { prisma } from '../data';

// GET all recipes
export const getRecipes = async (ctx: Context) => {
  try {
    const recipes = await prisma.recipe.findMany();
    ctx.body = recipes;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch recipes' };
  }
};

// POST new recipe
export const addRecipe = async (ctx: Context) => {
  const { title, description, ingredients, instructions, image_url, user_id } = ctx.request.body as {
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    image_url: string;
    user_id: number;
  };
  try {
    const recipe = await prisma.recipe.create({
      data: { title, description, ingredients, instructions, image_url, user_id },
    });
    ctx.status = 201;
    ctx.body = recipe;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to add recipe' };
  }
};

// GET recipe details by ID
export const getRecipeDetails = async (ctx: Context) => {
  const { id } = ctx.params;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { recipe_id: parseInt(id) },
    });

    if (!recipe) {
      ctx.status = 404;
      ctx.body = { error: 'Recipe not found' };
      return;
    }

    ctx.body = recipe;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch recipe details' };
  }
};

// PUT to update recipe by ID
export const updateRecipe = async (ctx: Context) => {
  const { id } = ctx.params;
  const { title, description, ingredients, instructions, image_url } = ctx.request.body as {
    title: string;
    description: string;
    ingredients: string;
    instructions: string;
    image_url: string;
  };
  try {
    const updatedRecipe = await prisma.recipe.update({
      where: { recipe_id: Number(id) },
      data: { title, description, ingredients, instructions, image_url },
    });
    ctx.body = updatedRecipe;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to update recipe' };
  }
};

// DELETE to remove recipe by ID
export const deleteRecipe = async (ctx: Context) => {
  const { id } = ctx.params;
  try {
    await prisma.recipe.delete({ where: { recipe_id: Number(id) } });
    ctx.status = 204;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to delete recipe' };
  }
};
