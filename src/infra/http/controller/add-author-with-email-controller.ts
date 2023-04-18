import { HttpResponse } from '@/helpers/index';
import {
  Controller,
  IHttpRequest,
  IHttpResponse,
  IAddAuthorWithEmailUseCase,
} from '@/interface/index';
import { validate } from 'class-validator';

import { AddAuthorWithEmailBodyDto } from '../dtos';
import { ExceptionFilter } from '../error';

export interface AddAuthorWithEmailRequest {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  picture?: string;
}
export interface AddAuthorWithEmailControllerParams {
  addAuthorWithEmailUseCase: IAddAuthorWithEmailUseCase;
}
export class AddAuthorWithEmailController implements Controller {
  constructor(private readonly params: AddAuthorWithEmailControllerParams) {}
  async handle(
    request: IHttpRequest<AddAuthorWithEmailRequest>,
  ): Promise<IHttpResponse> {
    try {
      const addAuthorWithEmailBodyDto = new AddAuthorWithEmailBodyDto();
      Object.assign(addAuthorWithEmailBodyDto, request.body);
      const hasErrors = await validate(addAuthorWithEmailBodyDto);
      if (hasErrors.length > 0) {
        return HttpResponse.badRequest(hasErrors);
      }
      const accessTokenAndRefreshTokenOrError =
        await this.params.addAuthorWithEmailUseCase.handle(
          addAuthorWithEmailBodyDto,
        );
      return HttpResponse.created(accessTokenAndRefreshTokenOrError);
    } catch (error) {
      return ExceptionFilter.handle(error);
    }
  }
}
