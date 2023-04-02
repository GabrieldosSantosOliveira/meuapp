import { Router } from 'express';

import { ExpressRouterAdapter } from '../adapters/express-router-adapter';
import { AddAuthorWithEmailRouterComposer } from '../composers/add-author-with-email-router-composer';
const addAuthorWithEmailRoute = (router: Router) => {
  const { addAuthorWithEmailController } =
    AddAuthorWithEmailRouterComposer.route();
  router.post(
    '/author',
    ExpressRouterAdapter.adapter(addAuthorWithEmailController),
  );
};
export default addAuthorWithEmailRoute;
