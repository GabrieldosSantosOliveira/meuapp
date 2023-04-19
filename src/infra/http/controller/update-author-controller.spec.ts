import { HttpStatus } from '@/helpers/http';
import { IHttpRequest } from '@/interface/http';
import {
  IUpdateAuthorUseCase,
  IUpdateAuthorUseCaseParams,
} from '@/interface/use-cases';
import { AuthorNotFoundException } from '@/utils/http';

import {
  UpdateAuthorController,
  UpdateAuthorControllerConstructorParams,
  UpdateAuthorControllerRequest,
} from './update-author-controller';
class UpdateAuthorUseCaseSpy implements IUpdateAuthorUseCase {
  public data: IUpdateAuthorUseCaseParams;
  async handle(data: IUpdateAuthorUseCaseParams): Promise<void> {
    this.data = data;
  }
}
class UpdateAuthorUseCaseWithError implements IUpdateAuthorUseCase {
  async handle(): Promise<void> {
    throw new Error();
  }
}
class UpdateAuthorUseCaseWithException implements IUpdateAuthorUseCase {
  async handle(): Promise<void> {
    throw new AuthorNotFoundException();
  }
}
const makeUpdateAuthorUseCaseSpy = () => {
  const updateAuthorUseCaseSpy = new UpdateAuthorUseCaseSpy();
  return { updateAuthorUseCaseSpy };
};

const makeSut = (
  params: Partial<UpdateAuthorControllerConstructorParams> = {},
) => {
  const { updateAuthorUseCaseSpy } = makeUpdateAuthorUseCaseSpy();
  const sut = new UpdateAuthorController({
    updateAuthorUseCase: updateAuthorUseCaseSpy,
    ...params,
  });
  return {
    sut,
    updateAuthorUseCaseSpy,
  };
};
const makeRequest = (
  params: Partial<UpdateAuthorControllerRequest> = {},
): IHttpRequest<UpdateAuthorControllerRequest> => ({
  params: {},
  query: {},
  body: {
    firstName: 'any_firstName',
    lastName: 'any_lastName',
    picture: 'https://google.com',
    ...params,
  },
  user: {
    sub: 'any_sub',
  },
});

describe('UpdateAuthorController', () => {
  it('should return 400 if firstName lastName less than 5 characters or more than 255 characters', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({
        firstName: 'any',
      }),
    );
    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if lastName lastName less than 5 characters or more than 255 characters', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({
        lastName: 'any',
      }),
    );
    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });

  it('should return 400 if a invalid url picture is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({ picture: 'invalid_picture' }),
    );
    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });
  it('should call updateAuthorUseCase with correct params', async () => {
    const { sut, updateAuthorUseCaseSpy } = makeSut();
    await sut.handle(makeRequest());
    expect(updateAuthorUseCaseSpy.data).toEqual({
      ...makeRequest().body,
      user: { sub: 'any_sub' },
    });
  });
  it('should return 204 if success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toEqual(HttpStatus.NO_CONTENT);
  });
  it('should return 500 if user is not provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({
      body: makeRequest().body,
      params: {},
      query: {},
    });
    expect(httpResponse.statusCode).toEqual(HttpStatus.SERVER_ERROR);
  });
  it('should return 500 if UpdateAuthorUseCase throw', async () => {
    const { sut } = makeSut({
      updateAuthorUseCase: new UpdateAuthorUseCaseWithError(),
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toEqual(HttpStatus.SERVER_ERROR);
  });
  it('should return 404 if UpdateAuthorUseCase throw exception AuthorNotFoundException', async () => {
    const { sut } = makeSut({
      updateAuthorUseCase: new UpdateAuthorUseCaseWithException(),
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse.statusCode).toEqual(HttpStatus.NOT_FOUND);
  });
});
