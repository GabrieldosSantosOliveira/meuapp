import { Router } from 'express';

import { ExpressRouterAdapter } from '../adapters';
import { AddAuthorWithEmailRouterComposer } from '../composers';
const addAuthorWithEmailRoute = (router: Router) => {
  const { addAuthorWithEmailController } =
    AddAuthorWithEmailRouterComposer.route();
  router.post(
    '/author',
    ExpressRouterAdapter.adapter(addAuthorWithEmailController),
  );
};
export default addAuthorWithEmailRoute;
