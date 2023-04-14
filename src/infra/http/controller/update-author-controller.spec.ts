import { HttpResponse } from '@/helpers/http';
import { IHttpRequest } from '@/interface/http';
import {
  IUpdateAuthorUseCase,
  IUpdateAuthorUseCaseParams,
} from '@/interface/use-cases';
import { EmailValidator, UrlValidator } from '@/interface/validations';
import { InvalidParamError } from '@/utils/http';

import {
  UpdateAuthorController,
  UpdateAuthorControllerRequest,
} from './update-author-controller';
class UpdateAuthorUseCaseSpy implements IUpdateAuthorUseCase {
  data!: IUpdateAuthorUseCaseParams;
  async handle(data: IUpdateAuthorUseCaseParams): Promise<void> {
    this.data = data;
  }
}
const makeUpdateAuthorUseCaseSpy = () => {
  const updateAuthorUseCaseSpy = new UpdateAuthorUseCaseSpy();
  return { updateAuthorUseCaseSpy };
};
class UrlValidatorSpy implements UrlValidator {
  public isValidUrl = true;
  async isValid(): Promise<boolean> {
    return this.isValidUrl;
  }
}
const makeUrlValidatorSpy = () => {
  const urlValidatorSpy = new UrlValidatorSpy();
  return { urlValidatorSpy };
};
const makeEmailValidatorSpy = () => {
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
const makeSut = () => {
  const { emailValidatorSpy } = makeEmailValidatorSpy();
  const { urlValidatorSpy } = makeUrlValidatorSpy();
  const { updateAuthorUseCaseSpy } = makeUpdateAuthorUseCaseSpy();
  const sut = new UpdateAuthorController({
    emailValidator: emailValidatorSpy,
    urlValidator: urlValidatorSpy,
    updateAuthorUseCase: updateAuthorUseCaseSpy,
  });
  return {
    sut,
    emailValidatorSpy,
    urlValidatorSpy,
    updateAuthorUseCaseSpy,
  };
};
const makeRequest = (
  params: Partial<UpdateAuthorControllerRequest> = {},
): IHttpRequest<UpdateAuthorControllerRequest> => ({
  body: {
    firstName: 'any_firstName',
    lastName: 'any_lastName',
    picture: 'any_picture',
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
    expect(httpResponse).toEqual(
      HttpResponse.badRequest(
        new InvalidParamError('firstName must be between 5 and 255 characters'),
      ),
    );
  });
  it('should return 400 if lastName lastName less than 5 characters or more than 255 characters', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(
      makeRequest({
        lastName: 'any',
      }),
    );
    expect(httpResponse).toEqual(
      HttpResponse.badRequest(
        new InvalidParamError('lastName must be between 5 and 255 characters'),
      ),
    );
  });

  it('should return 400 if a invalid url picture is provided', async () => {
    const { sut, urlValidatorSpy } = makeSut();
    urlValidatorSpy.isValidUrl = false;
    const httpResponse = await sut.handle(makeRequest({}));
    expect(httpResponse).toEqual(
      HttpResponse.badRequest(new InvalidParamError('picture need be a url')),
    );
  });
  it('should call updateAuthorUseCase with correct params', async () => {
    const { sut, updateAuthorUseCaseSpy } = makeSut();
    await sut.handle(makeRequest());
    expect(updateAuthorUseCaseSpy.data).toEqual({
      ...makeRequest().body,
      user: { sub: 'any_sub' },
    });
  });
});
