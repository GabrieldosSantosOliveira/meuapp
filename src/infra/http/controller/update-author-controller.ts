import { HttpResponse } from '@/helpers/http';
import { Controller } from '@/interface/controller';
import { IHttpRequest, IHttpResponse } from '@/interface/http';
import { IUpdateAuthorUseCase } from '@/interface/use-cases';
import { EmailValidator, UrlValidator } from '@/interface/validations';
import { InvalidParamError } from '@/utils/http';

import { ExceptionFilter } from '../error';

export interface UpdateAuthorControllerRequest {
  firstName?: string;
  lastName?: string;
  picture?: string;
}
export interface UpdateAuthorControllerParams {
  emailValidator: EmailValidator;
  urlValidator: UrlValidator;
  updateAuthorUseCase: IUpdateAuthorUseCase;
}
export class UpdateAuthorController implements Controller {
  constructor(private readonly params: UpdateAuthorControllerParams) {}
  async handle(
    request: IHttpRequest<UpdateAuthorControllerRequest>,
  ): Promise<IHttpResponse> {
    try {
      if (!request.user?.sub) {
        return HttpResponse.serverError();
      }
      const validations = {
        firstName(firstName: string) {
          if (firstName.length < 5 || firstName.length > 255) {
            return HttpResponse.badRequest(
              new InvalidParamError(
                'firstName must be between 5 and 255 characters',
              ),
            );
          }
        },
        lastName(lastName: string) {
          if (lastName.length < 5 || lastName.length > 255) {
            return HttpResponse.badRequest(
              new InvalidParamError(
                'lastName must be between 5 and 255 characters',
              ),
            );
          }
        },
        email(email: string) {
          if (email.length < 5 || email.length > 255) {
            return HttpResponse.badRequest(
              new InvalidParamError(
                'email must be between 5 and 255 characters',
              ),
            );
          }
        },
      };
      if (request.body.firstName) {
        const isInvalid = validations.firstName(request.body.firstName);
        if (isInvalid) return isInvalid;
      }
      if (request.body.lastName) {
        const isInvalid = validations.lastName(request.body.lastName);
        if (isInvalid) return isInvalid;
      }

      if (request.body.picture) {
        const isValidUrl = await this.params.urlValidator.isValid(
          request.body.picture,
        );
        if (!isValidUrl)
          return HttpResponse.badRequest(
            new InvalidParamError('picture need be a url'),
          );
      }

      await this.params.updateAuthorUseCase.handle({
        user: { sub: request.user['sub'] },
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        picture: request.body.picture,
      });
      return HttpResponse.noContent();
    } catch (error) {
      return ExceptionFilter.handle(error);
    }
  }
}
