import { Router } from 'express';

import { ExpressRouterAdapter } from '../adapters/express-router-adapter';
import { GetAllNoticeRouterComposer } from '../composers';
const GetAllNoticeRoute = (router: Router) => {
  const { getAllNoticeController } = GetAllNoticeRouterComposer.route();
  router.get('/notice', ExpressRouterAdapter.adapter(getAllNoticeController));
};
export default GetAllNoticeRoute;
