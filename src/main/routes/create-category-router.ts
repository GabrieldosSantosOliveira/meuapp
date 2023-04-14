import { Router } from 'express';

import { ExpressRouterAdapter } from '../adapters/express-router-adapter';
import { CreateCategoryRouterComposer } from '../composers';
import { auth } from '../middlewares';
const CreateCategoryRoute = (router: Router) => {
  const { createCategoryController } = CreateCategoryRouterComposer.route();
  router.post(
    '/category',
    auth,
    ExpressRouterAdapter.adapter(createCategoryController),
  );
};
export default CreateCategoryRoute;
