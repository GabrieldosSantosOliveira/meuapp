import { HttpResponse, HttpStatus } from '@/helpers/http';
import {
  IHttpRequest,
  EmailValidator,
  IAddAuthorWithEmailUseCase,
  IAddAuthorWithEmailUseCaseReturn,
} from '@/interface/index';
import { ConflictAuthorAlreadyExistsException } from '@/utils/http/exception/conflict-author-already-exists-exception';
import {
  ConflictAuthorAlreadyExists,
  InvalidParamError,
  MissingParamError,
} from '@/utils/index';
import { ValidateMissingParamsAdapter } from '@/validations/validation-missing-params';

import {
  AddAuthorWithEmailController,
  AddAuthorWithEmailRequest,
} from './add-author-with-email-controller';
const makeRequest = (
  param: Partial<AddAuthorWithEmailRequest> = {},
): IHttpRequest<AddAuthorWithEmailRequest> => {
  return {
    body: {
      email: 'any_email',
      firstName: 'any_first_name',
      lastName: 'any_last_name',
      password: 'any_password',
      picture: 'any_picture',
      ...param,
    },
  };
};
const makeValidatorSpy = () => {
  class EmailValidatorSpy implements EmailValidator {
    isEmailValid!: boolean;
    isValid(): boolean {
      return this.isEmailValid;
    }
  }
  const emailValidatorSpy = new EmailValidatorSpy();
  emailValidatorSpy.isEmailValid = true;
  return { emailValidatorSpy };
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
    return {
      accessToken: 'any_access_token',
      refreshToken: 'any_refresh_token',
    };
  }
}
class AddAuthorWithEmailUseCaseWithThroError
  implements IAddAuthorWithEmailUseCase
{
  async handle(): Promise<IAddAuthorWithEmailUseCaseReturn> {
    throw new Error();
    return {
      accessToken: 'any_access_token',
      refreshToken: 'any_refresh_token',
    };
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
  const { emailValidatorSpy } = makeValidatorSpy();
  const { addAuthorWithEmailUseCase } = makeAddAuthorWithEmailUseCase();
  const sut = new AddAuthorWithEmailController({
    addAuthorWithEmailUseCase: addAuthorWithEmailUseCase,
    emailValidator: emailValidatorSpy,
    validateMissingParams: new ValidateMissingParamsAdapter(),
  });
  return { sut, emailValidatorSpy, addAuthorWithEmailUseCase };
};
describe('Add Author With Email Controller', () => {
  it('should return 400 if no email is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({
        email: undefined,
      }),
    );
    expect(httpResponse).toEqual(
      HttpResponse.badRequest(new MissingParamError('email')),
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
    expect(httpResponse).toEqual(
      HttpResponse.badRequest(new MissingParamError('lastName')),
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
    expect(httpResponse).toEqual(
      HttpResponse.badRequest(new MissingParamError('firstName')),
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
    expect(httpResponse).toEqual(
      HttpResponse.badRequest(new MissingParamError('password')),
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
    expect(httpResponseLess).toEqual(
      HttpResponse.badRequest(
        new InvalidParamError('password must be between 5 and 255 characters'),
      ),
    );
    expect(httpResponseLess.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(httpResponseMore).toEqual(
      HttpResponse.badRequest(
        new InvalidParamError('password must be between 5 and 255 characters'),
      ),
    );
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
    expect(httpResponseLess).toEqual(
      HttpResponse.badRequest(
        new InvalidParamError('lastName must be between 5 and 255 characters'),
      ),
    );
    expect(httpResponseLess.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(httpResponseMore).toEqual(
      HttpResponse.badRequest(
        new InvalidParamError('lastName must be between 5 and 255 characters'),
      ),
    );
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
    expect(httpResponseLess).toEqual(
      HttpResponse.badRequest(
        new InvalidParamError('firstName must be between 5 and 255 characters'),
      ),
    );
    expect(httpResponseLess.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(httpResponseMore).toEqual(
      HttpResponse.badRequest(
        new InvalidParamError('firstName must be between 5 and 255 characters'),
      ),
    );
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
    expect(httpResponseLessCharacters).toEqual(
      HttpResponse.badRequest(
        new InvalidParamError('email must be between 5 and 255 characters'),
      ),
    );
    expect(httpResponseLessCharacters.statusCode).toBe(HttpStatus.BAD_REQUEST);
    expect(httpResponseMoreCharacters).toEqual(
      HttpResponse.badRequest(
        new InvalidParamError('email must be between 5 and 255 characters'),
      ),
    );
    expect(httpResponseMoreCharacters.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });
  it('should return 400 if invalid email is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut();
    emailValidatorSpy.isEmailValid = false;
    const httpResponse = await sut.handle(
      makeRequest({ email: 'any_invalid@mail.com' }),
    );
    expect(httpResponse).toEqual(
      HttpResponse.badRequest(new InvalidParamError('email is not valid')),
    );
    expect(httpResponse.statusCode).toBe(HttpStatus.BAD_REQUEST);
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
    const { emailValidatorSpy } = makeValidatorSpy();
    const { addAuthorWithEmailUseCaseWithThrowException } =
      makeAddAuthorWithEmailUseCaseWithThrowException();
    const sut = new AddAuthorWithEmailController({
      addAuthorWithEmailUseCase: addAuthorWithEmailUseCaseWithThrowException,
      emailValidator: emailValidatorSpy,
      validateMissingParams: new ValidateMissingParamsAdapter(),
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse).toEqual(
      HttpResponse.customError(
        HttpStatus.CONFLICT,
        new ConflictAuthorAlreadyExists(),
      ),
    );
  });
  it('should return 500 if AddAuthorWithEmailUseCase throw Error', async () => {
    const { emailValidatorSpy } = makeValidatorSpy();
    const sut = new AddAuthorWithEmailController({
      addAuthorWithEmailUseCase: new AddAuthorWithEmailUseCaseWithThroError(),
      emailValidator: emailValidatorSpy,
      validateMissingParams: new ValidateMissingParamsAdapter(),
    });
    const httpResponse = await sut.handle(makeRequest());
    expect(httpResponse).toEqual(HttpResponse.serverError());
  });
});
