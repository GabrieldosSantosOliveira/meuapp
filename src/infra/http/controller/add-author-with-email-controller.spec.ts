import { HttpResponse, HttpStatus } from '@/helpers/http';
import {
  IHttpRequest,
  IAddAuthorWithEmailUseCase,
  IAddAuthorWithEmailUseCaseReturn,
} from '@/interface/index';
import { ConflictAuthorAlreadyExistsException } from '@/utils/http/exception/conflict-author-already-exists-exception';
import { ConflictAuthorAlreadyExists } from '@/utils/index';

import {
  AddAuthorWithEmailController,
  AddAuthorWithEmailRequest,
} from './add-author-with-email-controller';
const makeRequest = (
  param: Partial<AddAuthorWithEmailRequest> = {},
): IHttpRequest<AddAuthorWithEmailRequest> => {
  return {
    params: {},
    query: {},
    body: {
      email: 'any_email@mail.com',
      firstName: 'any_first_name',
      lastName: 'any_last_name',
      password: 'any_password',
      picture: 'https://google.com',
      ...param,
    },
  };
};

class AddAuthorWithEmailUseCase implements IAddAuthorWithEmailUseCase {
  async handle(): Promise<IAddAuthorWithEmailUseCaseReturn> {
    return {
      accessToken: 'any_access_token',
      refreshToken: 'any_refresh_token',
    };
  }
}
class AddAuthorWithEmailUseCaseWithThrowException
  implements IAddAuthorWithEmailUseCase
{
  async handle(): Promise<IAddAuthorWithEmailUseCaseReturn> {
    throw new ConflictAuthorAlreadyExistsException();
  }
}
class AddAuthorWithEmailUseCaseWithThroError
  implements IAddAuthorWithEmailUseCase
{
  async handle(): Promise<IAddAuthorWithEmailUseCaseReturn> {
    throw new Error();
  }
}
const makeAddAuthorWithEmailUseCase = () => {
  const addAuthorWithEmailUseCase = new AddAuthorWithEmailUseCase();
  return { addAuthorWithEmailUseCase };
};
const makeAddAuthorWithEmailUseCaseWithThrowException = () => {
  const addAuthorWithEmailUseCaseWithThrowException =
    new AddAuthorWithEmailUseCaseWithThrowException();
  return { addAuthorWithEmailUseCaseWithThrowException };
};

const makeSut = () => {
  const { addAuthorWithEmailUseCase } = makeAddAuthorWithEmailUseCase();
  const sut = new AddAuthorWithEmailController({
    addAuthorWithEmailUseCase: addAuthorWithEmailUseCase,
  });
  return { sut, addAuthorWithEmailUseCase };
};
describe('Add Author With Email Controller', () => {
  it('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({
        email: undefined,
      }),
    );

    expect(httpResponse.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if no lastName is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({
        lastName: undefined,
      }),
    );

    expect(httpResponse.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if no firstName is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({
        firstName: undefined,
      }),
    );

    expect(httpResponse.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if no password is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({
        password: undefined,
      }),
    );

    expect(httpResponse.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if password less than 5 characters', async () => {
    const { sut } = makeSut();
    const httpResponseLess = await sut.handle(
      makeRequest({
        password: 'a'.repeat(4),
      }),
    );
    const httpResponseMore = await sut.handle(
      makeRequest({
        password: 'a'.repeat(256),
      }),
    );

    expect(httpResponseLess.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(httpResponseMore.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if lastName less than 5 characters or more than 255 characters', async () => {
    const { sut } = makeSut();
    const httpResponseLess = await sut.handle(
      makeRequest({
        lastName: 'a'.repeat(4),
      }),
    );
    const httpResponseMore = await sut.handle(
      makeRequest({
        lastName: 'a'.repeat(256),
      }),
    );

    expect(httpResponseLess.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(httpResponseMore.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if firstName less than 5 characters or more than 255 characters', async () => {
    const { sut } = makeSut();
    const httpResponseLess = await sut.handle(
      makeRequest({
        firstName: 'a'.repeat(4),
      }),
    );
    const httpResponseMore = await sut.handle(
      makeRequest({
        firstName: 'a'.repeat(256),
      }),
    );

    expect(httpResponseLess.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(httpResponseMore.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if email less than 5 characters or more than 255 characters', async () => {
    const { sut } = makeSut();
    const httpResponseLessCharacters = await sut.handle(
      makeRequest({
        email: 'a'.repeat(4),
      }),
    );
    const httpResponseMoreCharacters = await sut.handle(
      makeRequest({
        email: 'a'.repeat(256),
      }),
    );

    expect(httpResponseLessCharacters.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(httpResponseMoreCharacters.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if invalid email is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({ email: 'any_invalid' }),
    );
    expect(httpResponse.statusCode).toEqual(HttpStatus.BAD_REQUEST);
  });
  it('should return 201 if success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse).toEqual(
      HttpResponse.created({
        accessToken: 'any_access_token',
        refreshToken: 'any_refresh_token',
      }),
    );
  });
  it('should return 409 if AddAuthorWithEmailUseCase throw ConflictAuthorAlreadyExistsException', async () => {
    const { addAuthorWithEmailUseCaseWithThrowException } =
      makeAddAuthorWithEmailUseCaseWithThrowException();
    const sut = new AddAuthorWithEmailController({
      addAuthorWithEmailUseCase: addAuthorWithEmailUseCaseWithThrowException,
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse).toEqual(
      HttpResponse.customError(HttpStatus.CONFLICT, {
        error: new ConflictAuthorAlreadyExists(),
      }),
    );
  });
  it('should return 500 if AddAuthorWithEmailUseCase throw Error', async () => {
    const sut = new AddAuthorWithEmailController({
      addAuthorWithEmailUseCase: new AddAuthorWithEmailUseCaseWithThroError(),
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse).toEqual(HttpResponse.serverError());
  });
});
