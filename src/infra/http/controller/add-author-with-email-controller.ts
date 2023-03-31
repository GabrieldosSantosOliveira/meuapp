import { HttpResponse } from '@/helpers/http';
import {
  Controller,
  IHttpRequest,
  IHttpResponse,
  EmailValidator,
  ValidateMissingParams,
} from '@/interface/index';

import { InvalidParamError } from '../error';

export interface AddAuthorWithEmailRequest {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  picture?: string;
}
export class AddAuthorWithEmailController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly validateMissingParams: ValidateMissingParams,
  ) {}
  async handle(
    request: IHttpRequest<AddAuthorWithEmailRequest>,
  ): Promise<IHttpResponse> {
    const noHasParam = this.validateMissingParams.validate(
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
        new InvalidParamError('password must be between 5 and 255 characters'),
      );
    }
    if (
      request.body.firstName.length < 5 ||
      request.body.firstName.length > 255
    ) {
      return HttpResponse.badRequest(
        new InvalidParamError('firstName must be between 5 and 255 characters'),
      );
    }
    if (
      request.body.lastName.length < 5 ||
      request.body.lastName.length > 255
    ) {
      return HttpResponse.badRequest(
        new InvalidParamError('lastName must be between 5 and 255 characters'),
      );
    }
    if (request.body.email.length < 5 || request.body.email.length > 255) {
      return HttpResponse.badRequest(
        new InvalidParamError('email must be between 5 and 255 characters'),
      );
    }
    const isValid = this.emailValidator.isValid(request.body.email);
    if (!isValid) {
      return HttpResponse.badRequest(
        new InvalidParamError('email is not valid'),
      );
    }
    return HttpResponse.serverError();
  }
}
