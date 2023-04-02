import {
  AccessToken,
  IAuthService,
  Payload,
  RefreshToken,
} from '@/interface/index';

export class AuthServiceSpy implements IAuthService {
  public accessToken = 'any_access_token';
  public refreshToken = 'any_refresh_token';
  public accessTokenPayload = 'any_id';
  public refreshTokenPayload = 'any_id';

  async generateAccessToken(): Promise<AccessToken> {
    return { accessToken: this.accessToken };
  }
  async generateRefreshToken(): Promise<RefreshToken> {
    return { refreshToken: this.refreshToken };
  }
  async generateRefreshTokenAndAccessToken(): Promise<
    RefreshToken & AccessToken
  > {
    const { refreshToken } = await this.generateRefreshToken();
    const { accessToken } = await this.generateAccessToken();
    return { accessToken, refreshToken };
  }
  async decryptAccessToken(): Promise<Payload> {
    return { sub: this.accessTokenPayload };
  }
  async decryptRefreshToken(): Promise<Payload> {
    return { sub: this.refreshTokenPayload };
  }
}
export const makeAuthServiceSpy = () => {
  const authServiceSpy = new AuthServiceSpy();
  return { authServiceSpy };
};
