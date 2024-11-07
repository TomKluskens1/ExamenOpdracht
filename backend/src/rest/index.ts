import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import recipeRoutes from './recipeRoutes';
import userRoutes from './userRoutes'; 
import cors from '@koa/cors';
const app = new Koa();
app.use(cors());
app.use(bodyParser()); // Middleware to parse request bodies
app.use(recipeRoutes.routes());
app.use(recipeRoutes.allowedMethods());
app.use(userRoutes.routes());
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
