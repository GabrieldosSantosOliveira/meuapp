import { Router } from 'express';

import { ExpressRouterAdapter } from '../adapters';
import { ResetPasswordRouterComposer } from '../composers';
const ResetPasswordRoute = async (router: Router) => {
  const { resetPasswordController } = ResetPasswordRouterComposer.route();
  router.post(
    '/auth/reset-password',
    ExpressRouterAdapter.adapter(resetPasswordController),
  );
};
export default ResetPasswordRoute;
