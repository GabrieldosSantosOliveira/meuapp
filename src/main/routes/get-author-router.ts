import { Router } from 'express';

import { ExpressRouterAdapter } from '../adapters';
import { GetAuthorRouterComposer } from '../composers';
import { auth } from '../middlewares';
const getAuthorRoute = async (router: Router) => {
  const { getAuthorController } = GetAuthorRouterComposer.route();
  router.get('/me', auth, ExpressRouterAdapter.adapter(getAuthorController));
};
export default getAuthorRoute;
