import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import recipeRoutes from './rest/recipeRoutes';
import userRoutes from './rest/userRoutes';
import cors from '@koa/cors';

const app = new Koa();
app.use(cors());
app.use(bodyParser());
app.use(recipeRoutes.routes());
app.use(userRoutes.routes());
app.use(recipeRoutes.allowedMethods());

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
