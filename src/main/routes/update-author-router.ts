import { Router } from 'express';

import { ExpressRouterAdapter } from '../adapters/express-router-adapter';
import { UpdateAuthorRouterComposer } from '../composers/update-author-router-composer';
import { auth } from '../middlewares';

const updateAuthorRouter = async (router: Router) => {
  const { updateAuthorController } = UpdateAuthorRouterComposer.route();
  router.put('/me', auth, ExpressRouterAdapter.adapter(updateAuthorController));
};
export default updateAuthorRouter;
