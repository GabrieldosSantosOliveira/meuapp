import { Author } from '@/app/entities';
import { HttpResponse } from '@/helpers/http';
import { Payload } from '@/interface/auth';
import { IGetAuthorUseCase } from '@/interface/use-cases/get-author';
import { makeAuthor } from '@/test/factories';

import { AuthorViewModel } from '../view-models/author-view-model';
import {
  GetAuthorController,
  GetAuthorControllerParams,
} from './get-author-controller';
class GetAuthorUseCaseSpy implements IGetAuthorUseCase {
  public accessToken!: Payload;
  public author: Author = makeAuthor();
  async handle(accessToken: Payload): Promise<Author> {
    this.accessToken = accessToken;
    return this.author;
  }
}
class GetAuthorUseCaseSpyWithError implements IGetAuthorUseCase {
  async handle(): Promise<Author> {
    throw new Error();
  }
}
const makeGetAuthorUseCaseSpy = () => {
  const getAuthorUseCaseSpy = new GetAuthorUseCaseSpy();
  return { getAuthorUseCaseSpy };
};
const makeGetAuthorUseCaseSpyWithError = () => {
  const getAuthorUseCaseSpyWithError = new GetAuthorUseCaseSpyWithError();
  return { getAuthorUseCaseSpyWithError };
};
const makeSut = (params: Partial<GetAuthorControllerParams> = {}) => {
  const { getAuthorUseCaseSpy } = makeGetAuthorUseCaseSpy();
  const sut = new GetAuthorController({
    getAuthorUseCase: getAuthorUseCaseSpy,
    ...params,
  });
  return { sut, getAuthorUseCaseSpy };
};
describe('GetAuthorController', () => {
  it('should return 500 if accessToken is not provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({ body: {} });
    expect(httpResponse).toEqual(HttpResponse.serverError());
  });
  it('should call GetAuthorUseCase with correct params', async () => {
    const { sut, getAuthorUseCaseSpy } = makeSut();
    await sut.handle({
      body: {},
      user: {
        sub: 'any_sub',
      },
    });
    expect(getAuthorUseCaseSpy.accessToken).toEqual({ sub: 'any_sub' });
  });
  it('should return 200 if success', async () => {
    const { sut, getAuthorUseCaseSpy } = makeSut();
    const httpResponse = await sut.handle({
      body: {},
      user: {
        sub: 'any_sub',
      },
    });
    expect(httpResponse).toEqual(
      HttpResponse.ok(AuthorViewModel.toHTTP(getAuthorUseCaseSpy.author)),
    );
  });
  it('should return 500 if throw error', async () => {
    const { getAuthorUseCaseSpyWithError } = makeGetAuthorUseCaseSpyWithError();
    const { sut } = makeSut({
      getAuthorUseCase: getAuthorUseCaseSpyWithError,
    });

    const httpResponse = await sut.handle({
      body: {},
      user: {
        sub: 'any_sub',
      },
    });
    expect(httpResponse).toEqual(HttpResponse.serverError());
  });
});
