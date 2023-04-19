import { Router } from 'express';

import { ExpressRouterAdapter } from '../adapters';
import { AddAuthorWithGoogleProviderRouterComposer } from '../composers';
const AddAuthorWithGoogleProviderRoute = (router: Router) => {
  const { addAuthorWithGoogleProviderController } =
    AddAuthorWithGoogleProviderRouterComposer.route();
  router.post(
    '/author/google',
    ExpressRouterAdapter.adapter(addAuthorWithGoogleProviderController),
  );
};
export default AddAuthorWithGoogleProviderRoute;
