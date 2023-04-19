export interface IRefreshTokenUseCaseResponse {
  accessToken: string;
}
export interface IRefreshTokenUseCase {
  handle(refreshToken: string): Promise<IRefreshTokenUseCaseResponse>;
}
