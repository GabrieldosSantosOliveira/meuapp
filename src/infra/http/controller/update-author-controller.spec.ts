import { HttpStatus } from '@/helpers/http';
import { IHttpRequest } from '@/interface/http';
import {
  IUpdateAuthorUseCase,
  IUpdateAuthorUseCaseParams,
} from '@/interface/use-cases';

import {
  UpdateAuthorController,
  UpdateAuthorControllerRequest,
} from './update-author-controller';
class UpdateAuthorUseCaseSpy implements IUpdateAuthorUseCase {
  public data: IUpdateAuthorUseCaseParams;
  async handle(data: IUpdateAuthorUseCaseParams): Promise<void> {
    this.data = data;
  }
}
const makeUpdateAuthorUseCaseSpy = () => {
  const updateAuthorUseCaseSpy = new UpdateAuthorUseCaseSpy();
  return { updateAuthorUseCaseSpy };
};

const makeSut = () => {
  const { updateAuthorUseCaseSpy } = makeUpdateAuthorUseCaseSpy();
  const sut = new UpdateAuthorController({
    updateAuthorUseCase: updateAuthorUseCaseSpy,
  });
  return {
    sut,
    updateAuthorUseCaseSpy,
  };
};
const makeRequest = (
  params: Partial<UpdateAuthorControllerRequest> = {},
): IHttpRequest<UpdateAuthorControllerRequest> => ({
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
});
