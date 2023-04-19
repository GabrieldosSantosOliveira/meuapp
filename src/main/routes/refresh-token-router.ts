import { Router } from 'express';

import { ExpressRouterAdapter } from '../adapters';
import { RefreshTokenRouterComposer } from '../composers';
const RefreshTokenRoute = async (router: Router) => {
  const { refreshTokenController } = RefreshTokenRouterComposer.route();
  router.post(
    '/refreshToken',
    ExpressRouterAdapter.adapter(refreshTokenController),
  );
};
export default RefreshTokenRoute;
