import { HttpResponse } from '@/helpers/http';
import { Payload } from '@/interface/auth';
import { IHttpRequest } from '@/interface/http';
import { IRemoveAuthorUseCase } from '@/interface/use-cases';

import {
  RemoveAuthorController,
  RemoveAuthorControllerConstructorParams,
} from './remove-author-controller';
class RemoveAuthorUseCaseSpy implements IRemoveAuthorUseCase {
  async handle(): Promise<void> {
    return;
  }
}
class RemoveAuthorUseCaseSpyWithError implements IRemoveAuthorUseCase {
  async handle(): Promise<void> {
    throw new Error();
  }
}
const makeRemoveAuthorUseCaseSpy = () => {
  const removeAuthorUseCaseSpy = new RemoveAuthorUseCaseSpy();
  return { removeAuthorUseCaseSpy };
};
const makeRemoveAuthorUseCaseSpyWithError = () => {
  const removeAuthorUseCaseSpyWithError = new RemoveAuthorUseCaseSpyWithError();
  return { removeAuthorUseCaseSpyWithError };
};
const makeSut = (
  params: Partial<RemoveAuthorControllerConstructorParams> = {},
) => {
  const { removeAuthorUseCaseSpy } = makeRemoveAuthorUseCaseSpy();
  const sut = new RemoveAuthorController({
    removeAuthorUseCase: removeAuthorUseCaseSpy,
    ...params,
  });
  return { removeAuthorUseCaseSpy, sut };
};
const makeRequest = (user: Partial<Payload> = {}): IHttpRequest => {
  return {
    params: {},
    query: {},
    body: {},
    user: { sub: 'any_id', ...user },
  };
};
describe('RemoveAuthorController', () => {
  it('should return 204 if success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse).toEqual(HttpResponse.noContent());
  });
  it('should return 500 if throw error', async () => {
    const { removeAuthorUseCaseSpyWithError } =
      makeRemoveAuthorUseCaseSpyWithError();
    const { sut } = makeSut({
      removeAuthorUseCase: removeAuthorUseCaseSpyWithError,
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse).toEqual(HttpResponse.serverError());
  });
  it('should return 500 if user is not provided', async () => {
    const { sut } = makeSut();
    await sut.handle(makeRequest({ sub: undefined }));
  });
});
