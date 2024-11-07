import Router from '@koa/router';
import { getRecipes, addRecipe, getRecipeDetails, updateRecipe, deleteRecipe } from '../service/recipeController';
import { prisma } from '../data';

const router = new Router();

// Define routes
router.get('/api/recipes', getRecipes);
router.post('/api/recipes', addRecipe);
router.get('/api/recipes/:id', getRecipeDetails);
router.put('/api/recipes/:id', updateRecipe);
router.delete('/api/recipes/:id', deleteRecipe);

export default router;
