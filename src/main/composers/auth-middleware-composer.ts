import { AuthMiddleware } from '@/infra/auth/middlewares/auth-middleware';

import { authService } from './../lib';
export class AuthMiddlewareComposer {
  public static route() {
    const authMiddleware = new AuthMiddleware({
      authService,
    });
    return { authMiddleware };
  }
}
