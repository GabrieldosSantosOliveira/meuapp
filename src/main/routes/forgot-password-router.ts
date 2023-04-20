import { Router } from 'express';

import { ExpressRouterAdapter } from '../adapters';
import { ForgotPasswordRouterComposer } from '../composers';
const ForgotPasswordRoute = (router: Router) => {
  const { forgotPasswordController } = ForgotPasswordRouterComposer.route();
  router.post(
    '/auth/forgot-password',
    ExpressRouterAdapter.adapter(forgotPasswordController),
  );
};
export default ForgotPasswordRoute;
