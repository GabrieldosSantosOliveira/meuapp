import { HttpStatus } from '@/helpers/http';
import { DefaultFieldType, IHttpRequest } from '@/interface/http';
import {
  IAddAuthorWithGoogleProviderUseCase,
  IAddAuthorWithGoogleProviderUseCaseResponse,
} from '@/interface/use-cases';
import { AuthorNotFoundException } from '@/utils/http';

import {
  AddAuthorWithGoogleProviderConstructorParams,
  AddAuthorWithGoogleProviderController,
  AddAuthorWithGoogleProviderControllerBody,
} from './add-author-with-google-provider-controller';
class AddAuthorWithGoogleProviderUseCaseSpy
  implements IAddAuthorWithGoogleProviderUseCase
{
  accessToken = 'any_access_token';
  refreshToken = 'any_refresh_token';
  async handle(): Promise<IAddAuthorWithGoogleProviderUseCaseResponse> {
    return { accessToken: this.accessToken, refreshToken: this.refreshToken };
  }
}
class AddAuthorWithGoogleProviderWithError
  implements IAddAuthorWithGoogleProviderUseCase
{
  async handle(): Promise<IAddAuthorWithGoogleProviderUseCaseResponse> {
    throw new Error();
  }
}
class AddAuthorWithGoogleProviderWithException
  implements IAddAuthorWithGoogleProviderUseCase
{
  async handle(): Promise<IAddAuthorWithGoogleProviderUseCaseResponse> {
    throw new AuthorNotFoundException();
  }
}
const makeAddAuthorWithGoogleProviderUseCaseSpy = () => {
  const addAuthorWithGoogleProviderUseCaseSpy =
    new AddAuthorWithGoogleProviderUseCaseSpy();
  return { addAuthorWithGoogleProviderUseCaseSpy };
};
const makeSut = (
  params: Partial<AddAuthorWithGoogleProviderConstructorParams> = {},
) => {
  const { addAuthorWithGoogleProviderUseCaseSpy } =
    makeAddAuthorWithGoogleProviderUseCaseSpy();
  const sut = new AddAuthorWithGoogleProviderController({
    addAuthorWithGoogleProviderUseCase: addAuthorWithGoogleProviderUseCaseSpy,
    ...params,
  });
  return { sut, addAuthorWithGoogleProviderUseCaseSpy };
};
const makeRequest = (
  body: Partial<AddAuthorWithGoogleProviderControllerBody> = {},
): IHttpRequest<
  AddAuthorWithGoogleProviderControllerBody,
  DefaultFieldType,
  DefaultFieldType
> => {
  return {
    body: { accessToken: 'any_access_token', ...body },
    params: {},
    query: {},
  };
};
describe('AddAuthorWithGoogleProviderController', () => {
  it('should return 200 if success', async () => {
    const { sut, addAuthorWithGoogleProviderUseCaseSpy } = makeSut();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatus.OK);
    expect(httpResponse.body).toEqual({
      accessToken: addAuthorWithGoogleProviderUseCaseSpy.accessToken,
      refreshToken: addAuthorWithGoogleProviderUseCaseSpy.refreshToken,
    });
  });
  it('should return 400 if accessToken is not provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({ accessToken: undefined }),
    );
    expect(httpResponse.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it('should return 500 if AddAuthorWithGoogleProvider throw', async () => {
    const { sut } = makeSut({
      addAuthorWithGoogleProviderUseCase:
        new AddAuthorWithGoogleProviderWithError(),
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatus.SERVER_ERROR);
  });
  it('should return 404 if AddAuthorWithGoogleProvider throw exception AuthorNotFoundException', async () => {
    const { sut } = makeSut({
      addAuthorWithGoogleProviderUseCase:
        new AddAuthorWithGoogleProviderWithException(),
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toBe(HttpStatus.NOT_FOUND);
  });
});
