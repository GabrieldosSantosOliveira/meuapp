export interface IForgotPasswordUseCaseParams {
  email: string;
}
export interface IForgotPasswordUseCase {
  handle(data: IForgotPasswordUseCaseParams): Promise<void>;
}
