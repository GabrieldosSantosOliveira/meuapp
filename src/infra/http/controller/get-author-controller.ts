import { HttpResponse } from '@/helpers/http';
import { Controller } from '@/interface/controller';
import { IHttpRequest, IHttpResponse } from '@/interface/http';
import { IGetAuthorUseCase } from '@/interface/use-cases/get-author';
import { DefaultFieldType } from '@/interface/validations';

import { ExceptionFilter } from '../error';
import { AuthorViewModel } from '../view-models/author-view-model';
export interface GetAuthorControllerParams {
  getAuthorUseCase: IGetAuthorUseCase;
}
export class GetAuthorController implements Controller {
  constructor(private readonly params: GetAuthorControllerParams) {}
  async handle(
    request: IHttpRequest<DefaultFieldType>,
  ): Promise<IHttpResponse> {
    try {
      if (!request.user?.sub) {
        return HttpResponse.serverError();
      }
      const author = await this.params.getAuthorUseCase.handle(request.user);
      return HttpResponse.ok(AuthorViewModel.toHTTP(author));
    } catch (error) {
      return ExceptionFilter.handle(error);
    }
  }
}
