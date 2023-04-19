import { RefreshTokenUseCase } from '@/app/use-cases';
import { RefreshTokenController } from '@/infra/http/controller';

import { authService } from '../lib';

export class RefreshTokenRouterComposer {
  public static route() {
    const refreshTokenUseCase = new RefreshTokenUseCase({
      authService: authService,
    });
    const refreshTokenController = new RefreshTokenController({
      refreshTokenUseCase,
    });
    return { refreshTokenController };
  }
}
