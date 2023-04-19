import { IAuthService } from '@/interface/auth';
import {
  IRefreshTokenUseCase,
  IRefreshTokenUseCaseResponse,
} from '@/interface/use-cases';

export interface RefreshTokenUseCaseConstructorParams {
  authService: IAuthService;
}
export class RefreshTokenUseCase implements IRefreshTokenUseCase {
  constructor(private readonly params: RefreshTokenUseCaseConstructorParams) {}
  async handle(refreshToken: string): Promise<IRefreshTokenUseCaseResponse> {
    const { sub } = await this.params.authService.decryptRefreshToken(
      refreshToken,
    );
    const { accessToken } = await this.params.authService.generateAccessToken(
      sub,
    );
    return { accessToken };
  }
}
