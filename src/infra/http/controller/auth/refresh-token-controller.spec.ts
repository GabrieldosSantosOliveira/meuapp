import { HttpStatus } from '@/helpers/http';
import { DefaultFieldType, IHttpRequest } from '@/interface/http';
import {
  IRefreshTokenUseCase,
  IRefreshTokenUseCaseResponse,
} from '@/interface/use-cases';
import { UnauthorizedException } from '@/utils/http';

import {
  RefreshTokenController,
  RefreshTokenControllerBody,
  RefreshTokenControllerConstructorParams,
} from './refresh-token-controller';
class RefreshTokenUseCaseSpy implements IRefreshTokenUseCase {
  accessToken = 'any_access_token';
  async handle(): Promise<IRefreshTokenUseCaseResponse> {
    return { accessToken: this.accessToken };
  }
}
class RefreshTokenUseCaseInvalidCredentials implements IRefreshTokenUseCase {
  async handle(): Promise<IRefreshTokenUseCaseResponse> {
    throw new UnauthorizedException();
  }
}
class RefreshTokenUseCaseWithError implements IRefreshTokenUseCase {
  async handle(): Promise<IRefreshTokenUseCaseResponse> {
    throw new Error();
  }
}
const makeRefreshTokenUseCaseSpy = () => {
  const refreshTokenUseCaseSpy = new RefreshTokenUseCaseSpy();
  return { refreshTokenUseCaseSpy };
};
const makeSut = (
  params: Partial<RefreshTokenControllerConstructorParams> = {},
) => {
  const { refreshTokenUseCaseSpy } = makeRefreshTokenUseCaseSpy();
  const sut = new RefreshTokenController({
    refreshTokenUseCase: refreshTokenUseCaseSpy,
    ...params,
  });
  return { sut, refreshTokenUseCaseSpy };
};
const makeRequest = (
  body: Partial<RefreshTokenControllerBody> = {},
): IHttpRequest<
  RefreshTokenControllerBody,
  DefaultFieldType,
  DefaultFieldType
> => {
  return {
    body: {
      refreshToken: 'any_refresh_token',
      ...body,
    },
    params: {},
    query: {},
  };
};
describe('', () => {
  it('should return 200 if success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatus.OK);
    expect(httpResponse.body).toEqual({ accessToken: 'any_access_token' });
  });
  it('should return 400 if refreshToken is not provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({ refreshToken: undefined }),
    );
    expect(httpResponse.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it('should return 401 if invalid refreshToken is provided', async () => {
    const { sut } = makeSut({
      refreshTokenUseCase: new RefreshTokenUseCaseInvalidCredentials(),
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatus.UNAUTHORIZED_ERROR);
  });
  it('should return 500 if RefreshTokenUseCase throw', async () => {
    const { sut } = makeSut({
      refreshTokenUseCase: new RefreshTokenUseCaseWithError(),
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatus.SERVER_ERROR);
  });
});
