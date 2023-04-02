import {
  AccessToken,
  Decrypt,
  Encrypt,
  IAuthService,
  Payload,
  RefreshToken,
} from '@/interface/index';
import { UnauthorizedException } from '@/utils/http/exception/unauthorized-exception';
import { InvalidParamError } from '@/utils/index';
export interface Params {
  secretAccessToken: string;
  secretRefreshToken: string;
  expirationAccessToken: number;
  expirationRefreshToken: number;
  encrypt: Encrypt;
  decrypt: Decrypt;
}

export class AuthService implements IAuthService {
  private readonly params: Params;
  constructor(params: Params) {
    if (params.secretAccessToken === params.secretRefreshToken) {
      throw new InvalidParamError(
        'secretAccessToken cannot be equal to secretRefreshToken',
      );
    }
    this.params = params;
  }
  async generateRefreshTokenAndAccessToken(
    id: string,
  ): Promise<RefreshToken & AccessToken> {
    const { accessToken } = await this.generateAccessToken(id);
    const { refreshToken } = await this.generateRefreshToken(id);
    return { accessToken, refreshToken };
  }
  async decryptAccessToken(accessToken: string): Promise<Payload> {
    try {
      return await this.params.decrypt.decrypt(accessToken, {
        secret: this.params.secretAccessToken,
      });
    } catch {
      throw new UnauthorizedException();
    }
  }
  async decryptRefreshToken(refreshToken: string): Promise<Payload> {
    try {
      return await this.params.decrypt.decrypt(refreshToken, {
        secret: this.params.secretRefreshToken,
      });
    } catch {
      throw new UnauthorizedException();
    }
  }
  async generateAccessToken(id: string): Promise<AccessToken> {
    const accessToken = await this.params.encrypt.encrypt(id, {
      expire: this.params.expirationAccessToken,
      secret: this.params.secretAccessToken,
    });
    return { accessToken };
  }
  async generateRefreshToken(id: string): Promise<RefreshToken> {
    const refreshToken = await this.params.encrypt.encrypt(id, {
      expire: this.params.expirationRefreshToken,
      secret: this.params.secretRefreshToken,
    });
    return { refreshToken };
  }
}
