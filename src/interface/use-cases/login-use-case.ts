export interface ILoginUseCaseRequest {
  email: string;
  password: string;
}
export interface ILoginUseCaseResponse {
  accessToken: string;
  refreshToken: string;
}
export interface ILoginUseCase {
  handle(data: ILoginUseCaseRequest): Promise<ILoginUseCaseResponse>;
}
