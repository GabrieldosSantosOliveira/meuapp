import { Router } from 'express';

import { ExpressRouterAdapter } from '../adapters/express-router-adapter';
import { GetAuthorRouterComposer } from '../composers/get-author-router-composer';
import { auth } from '../middlewares';
const getAuthorRoute = async (router: Router) => {
  const { getAuthorController } = GetAuthorRouterComposer.route();
  router.get('/me', auth, ExpressRouterAdapter.adapter(getAuthorController));
};
export default getAuthorRoute;
