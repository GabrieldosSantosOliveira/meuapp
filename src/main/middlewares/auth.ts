import { ExpressMiddlewareAdapter } from '../adapters';
import { AuthMiddlewareComposer } from '../composers';

export const auth = ExpressMiddlewareAdapter.adapter(
  AuthMiddlewareComposer.route().authMiddleware,
);
