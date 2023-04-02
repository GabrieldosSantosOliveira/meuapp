import { ExpressMiddlewareAdapter } from '../adapters/express-middleware-adapter';
import { AuthMiddlewareComposer } from '../composers/auth-middleware-composer';

export const auth = ExpressMiddlewareAdapter.adapter(
  AuthMiddlewareComposer.route().authMiddleware,
);
