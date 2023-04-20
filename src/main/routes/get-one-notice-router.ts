import { Router } from 'express';

import { ExpressRouterAdapter } from '../adapters';
import { GetOneNoticeRouterComposer } from '../composers';
const GetOneNoticeRoute = async (router: Router) => {
  const { getOneNoticeController } = GetOneNoticeRouterComposer.route();
  router.post(
    '/notice/:id',
    ExpressRouterAdapter.adapter(getOneNoticeController),
  );
};
export default GetOneNoticeRoute;
