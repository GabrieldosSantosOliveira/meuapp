export interface IResetPasswordUseCaseRequest {
  resetPasswordToken: string;
  email: string;
  passwordReset: string;
}
export interface IResetPasswordUseCase {
  handle(data: IResetPasswordUseCaseRequest): Promise<void>;
}
