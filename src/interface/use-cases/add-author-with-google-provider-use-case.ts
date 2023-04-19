export interface IAddAuthorWithGoogleProviderUseCaseResponse {
  accessToken: string;
  refreshToken: string;
}
export interface IAddAuthorWithGoogleProviderUseCase {
  handle(
    accessToken: string,
  ): Promise<IAddAuthorWithGoogleProviderUseCaseResponse>;
}
