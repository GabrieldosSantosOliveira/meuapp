import { HttpResponse } from '@/helpers/http';
import {
  IUpdateAuthorUseCase,
  IHttpRequest,
  IHttpResponse,
  Controller,
} from '@/interface/index';
import { validate } from 'class-validator';

import { UpdateAuthorBodyDto } from '../dtos/update-author-body.dto';
import { ExceptionFilter } from '../error';

export interface UpdateAuthorControllerRequest {
  firstName?: string;
  lastName?: string;
  picture?: string;
}
export interface UpdateAuthorControllerParams {
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
      const updateAuthorBodyDto = new UpdateAuthorBodyDto();
      Object.assign(updateAuthorBodyDto, request.body);
      const hasErrors = await validate(updateAuthorBodyDto);
      if (hasErrors.length > 0) {
        return HttpResponse.badRequest(hasErrors);
      }
      await this.params.updateAuthorUseCase.handle({
        user: { sub: request.user['sub'] },
        firstName: updateAuthorBodyDto.firstName,
        lastName: updateAuthorBodyDto.lastName,
        picture: updateAuthorBodyDto.picture,
      });
      return HttpResponse.noContent();
    } catch (error) {
      console.log(error);
      return ExceptionFilter.handle(error);
    }
  }
}
