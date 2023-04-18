import { AuthMiddleware } from '@/infra/auth';

import { authService } from './../lib';
export class AuthMiddlewareComposer {
  public static route() {
    const authMiddleware = new AuthMiddleware({
      authService,
    });
    return { authMiddleware };
  }
}
