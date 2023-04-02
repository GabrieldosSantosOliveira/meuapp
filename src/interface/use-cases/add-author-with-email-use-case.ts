export interface IAddAuthorWithEmailUseCaseParams {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  picture?: string;
}
export interface IAddAuthorWithEmailUseCaseReturn {
  accessToken: string;
  refreshToken: string;
}
export interface IAddAuthorWithEmailUseCase {
  handle(
    data: IAddAuthorWithEmailUseCaseParams,
  ): Promise<IAddAuthorWithEmailUseCaseReturn>;
}
