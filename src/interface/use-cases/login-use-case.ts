export interface ILoginUseCaseRequest {
  email: string;
  password: string;
}
export interface ILoginUseCaseResponse {
  accessToken: string;
}
export interface ILoginUseCase {
  handle(data: ILoginUseCaseRequest): Promise<ILoginUseCaseResponse>;
}
