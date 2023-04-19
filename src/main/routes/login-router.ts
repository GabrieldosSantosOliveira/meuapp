import { Router } from 'express';

import { ExpressRouterAdapter } from '../adapters';
import { LoginRouterComposer } from '../composers';
const LoginRouter = async (router: Router) => {
  const { loginController } = LoginRouterComposer.route();
  router.post('/login', ExpressRouterAdapter.adapter(loginController));
};
export default LoginRouter;
