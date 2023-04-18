import { Router } from 'express';

import { ExpressRouterAdapter } from '../adapters/express-router-adapter';
import { CreateNoticeRouterComposer } from '../composers';
import { auth } from '../middlewares';
const CreateNoticeRoute = (router: Router) => {
  const { createNoticeController } = CreateNoticeRouterComposer.route();
  router.post(
    '/notice',
    auth,
    ExpressRouterAdapter.adapter(createNoticeController),
  );
};
export default CreateNoticeRoute;
