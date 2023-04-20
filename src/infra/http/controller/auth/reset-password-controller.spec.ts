import { HttpStatus } from '@/helpers/http';
import { DefaultFieldType, IHttpRequest } from '@/interface/http';
import {
  IResetPasswordUseCase,
  IResetPasswordUseCaseRequest,
} from '@/interface/use-cases';
import { AuthorNotFoundException } from '@/utils/http';

import {
  ResetPasswordController,
  ResetPasswordControllerBody,
  ResetPasswordControllerConstructorParams,
} from './reset-password-controller';
class ResetPasswordUseCaseSpy implements IResetPasswordUseCase {
  data: IResetPasswordUseCaseRequest;
  async handle(data: IResetPasswordUseCaseRequest): Promise<void> {
    this.data = data;
  }
}
class ResetPasswordUseCaseWithError implements IResetPasswordUseCase {
  async handle(): Promise<void> {
    throw new Error();
  }
}
class ResetPasswordUseCaseWithException implements IResetPasswordUseCase {
  async handle(): Promise<void> {
    throw new AuthorNotFoundException();
  }
}
const makeSut = (
  params: Partial<ResetPasswordControllerConstructorParams> = {},
) => {
  const resetPasswordUseCaseSpy = new ResetPasswordUseCaseSpy();
  const sut = new ResetPasswordController({
    resetPasswordUseCase: resetPasswordUseCaseSpy,
    ...params,
  });
  return { sut, resetPasswordUseCaseSpy };
};
const makeRequest = (
  body: Partial<ResetPasswordControllerBody> = {},
): IHttpRequest<
  ResetPasswordControllerBody,
  DefaultFieldType,
  DefaultFieldType
> => {
  return {
    body: {
      email: 'any_email@mail.com',
      passwordReset: 'password_reset',
      resetPasswordToken: 'any_reset_password_token',
      ...body,
    },
    params: {},
    query: {},
  };
};
describe('ResetPasswordController', () => {
  it('should return 400 if resetPasswordToken is not provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({ resetPasswordToken: undefined }),
    );
    expect(httpResponse.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if resetPasswordToken is not provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({ resetPasswordToken: undefined }),
    );
    expect(httpResponse.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if email is not provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest({ email: undefined }));
    expect(httpResponse.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if passwordReset is not provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({ passwordReset: undefined }),
    );
    expect(httpResponse.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it('should call ResetPasswordUseCase with correct params', async () => {
    const { sut, resetPasswordUseCaseSpy } = makeSut();
    await sut.handle(makeRequest());
    expect(makeRequest().body).toEqual(resetPasswordUseCaseSpy.data);
  });
  it('should return 204 if success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toEqual(HttpStatus.NO_CONTENT);
  });
  it('should return 500 if ResetPasswordUseCase throw ', async () => {
    const { sut } = makeSut({
      resetPasswordUseCase: new ResetPasswordUseCaseWithError(),
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toEqual(HttpStatus.SERVER_ERROR);
  });
  it('should return 404 if ResetPasswordUseCase throw exception AuthorNotFoundException', async () => {
    const { sut } = makeSut({
      resetPasswordUseCase: new ResetPasswordUseCaseWithException(),
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toEqual(HttpStatus.NOT_FOUND);
  });
});
