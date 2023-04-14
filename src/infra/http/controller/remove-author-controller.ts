import { HttpResponse } from '@/helpers/http';
import { Controller } from '@/interface/controller';
import { IHttpRequest, IHttpResponse } from '@/interface/http';
import { IRemoveAuthorUseCase } from '@/interface/use-cases';
import { DefaultFieldType } from '@/interface/validations';

import { ExceptionFilter } from '../error';
export interface RemoveAuthorControllerConstructorParams {
  removeAuthorUseCase: IRemoveAuthorUseCase;
}
export class RemoveAuthorController implements Controller {
  constructor(
    private readonly params: RemoveAuthorControllerConstructorParams,
  ) {}
  async handle(
    request: IHttpRequest<DefaultFieldType>,
  ): Promise<IHttpResponse> {
    try {
      if (!request.user?.sub) {
        return HttpResponse.serverError();
      }
      await this.params.removeAuthorUseCase.handle(request.user.sub);
      return HttpResponse.noContent();
    } catch (error) {
      return ExceptionFilter.handle(error);
    }
  }
}
