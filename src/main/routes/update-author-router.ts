import { Router } from 'express';

import { ExpressRouterAdapter } from '../adapters';
import { UpdateAuthorRouterComposer } from '../composers';
import { auth } from '../middlewares';

const updateAuthorRouter = async (router: Router) => {
  const { updateAuthorController } = UpdateAuthorRouterComposer.route();
  router.put('/me', auth, ExpressRouterAdapter.adapter(updateAuthorController));
};
export default updateAuthorRouter;
