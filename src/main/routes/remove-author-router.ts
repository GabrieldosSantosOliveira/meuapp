import { Router } from 'express';

import { ExpressRouterAdapter } from '../adapters';
import { RemoveAuthorRouterComposer } from '../composers';
import { auth } from '../middlewares';
const removeAuthorRouter = async (router: Router) => {
  const { removeAuthorController } = RemoveAuthorRouterComposer.route();
  router.delete(
    '/me',
    auth,
    ExpressRouterAdapter.adapter(removeAuthorController),
  );
};
export default removeAuthorRouter;
