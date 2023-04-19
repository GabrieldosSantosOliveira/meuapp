import { Router } from 'express';

import { ExpressRouterAdapter } from '../adapters';
import { GetAllNoticeByCategoryRouterComposer } from '../composers';
const GetAllNoticeByCategoryRoute = (router: Router) => {
  const { getAllNoticeByCategoryController } =
    GetAllNoticeByCategoryRouterComposer.route();
  router.get(
    '/notice/category/:categoryTitle',
    ExpressRouterAdapter.adapter(getAllNoticeByCategoryController),
  );
};
export default GetAllNoticeByCategoryRoute;
