import Router from '@koa/router';
import { loginUser,registerUser, updateUserBio, getUserRecipes } from '../service/userController';

const router = new Router();

router.post('/api/login', loginUser);
router.post('/api/register', registerUser);
router.patch('/api/user/bio', updateUserBio); 
router.get('/recipes/user/:userId', getUserRecipes);
export default router;
