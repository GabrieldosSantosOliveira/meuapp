export interface RefreshToken {
  refreshToken: string;
}
export interface AccessToken {
  accessToken: string;
}
export interface Payload {
  sub: string;
}
export interface IAuthService {
  generateAccessToken(id: string): Promise<AccessToken>;
  generateRefreshToken(id: string): Promise<RefreshToken>;
  generateRefreshTokenAndAccessToken(
    id: string,
  ): Promise<RefreshToken & AccessToken>;
  decryptAccessToken(accessToken: string): Promise<Payload>;
  decryptRefreshToken(refreshToken: string): Promise<Payload>;
}
