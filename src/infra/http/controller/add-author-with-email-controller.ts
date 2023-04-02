import { HttpResponse } from '@/helpers/index';
import {
  Controller,
  IHttpRequest,
  IHttpResponse,
  EmailValidator,
  ValidateMissingParams,
  IAddAuthorWithEmailUseCase,
} from '@/interface/index';
import { InvalidParamError } from '@/utils/index';

import { ExceptionFilter } from '../error';

export interface AddAuthorWithEmailRequest {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  picture?: string;
}
export interface AddAuthorWithEmailControllerParams {
  emailValidator: EmailValidator;
  validateMissingParams: ValidateMissingParams;
  addAuthorWithEmailUseCase: IAddAuthorWithEmailUseCase;
}
export class AddAuthorWithEmailController implements Controller {
  constructor(private readonly params: AddAuthorWithEmailControllerParams) {}
  async handle(
    request: IHttpRequest<AddAuthorWithEmailRequest>,
  ): Promise<IHttpResponse> {
    try {
      const noHasParam = this.params.validateMissingParams.validate(
        ['lastName', 'firstName', 'password', 'email'],
        request.body,
      );
      if (noHasParam) {
        return HttpResponse.badRequest(noHasParam);
      }
      if (
        request.body.password.length < 5 ||
        request.body.password.length > 255
      ) {
        return HttpResponse.badRequest(
          new InvalidParamError(
            'password must be between 5 and 255 characters',
          ),
        );
      }
      if (
        request.body.firstName.length < 5 ||
        request.body.firstName.length > 255
      ) {
        return HttpResponse.badRequest(
          new InvalidParamError(
            'firstName must be between 5 and 255 characters',
          ),
        );
      }
      if (
        request.body.lastName.length < 5 ||
        request.body.lastName.length > 255
      ) {
        return HttpResponse.badRequest(
          new InvalidParamError(
            'lastName must be between 5 and 255 characters',
          ),
        );
      }
      if (request.body.email.length < 5 || request.body.email.length > 255) {
        return HttpResponse.badRequest(
          new InvalidParamError('email must be between 5 and 255 characters'),
        );
      }
      const isValid = this.params.emailValidator.isValid(request.body.email);
      if (!isValid) {
        return HttpResponse.badRequest(
          new InvalidParamError('email is not valid'),
        );
      }
      const accessTokenAndRefreshTokenOrError =
        await this.params.addAuthorWithEmailUseCase.handle(request.body);
      return HttpResponse.created(accessTokenAndRefreshTokenOrError);
    } catch (error) {
      return ExceptionFilter.handle(error);
    }
  }
}
