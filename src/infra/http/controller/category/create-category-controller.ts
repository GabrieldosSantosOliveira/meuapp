import { HttpResponse } from '@/helpers/http';
import { Controller } from '@/interface/controller';
import { IHttpRequest, IHttpResponse } from '@/interface/http';
import { ICreateCategoryUseCase } from '@/interface/use-cases';
import { InvalidParamError, MissingParamError } from '@/utils/http';

import { ExceptionFilter } from '../../error';
import { CategoryViewModel } from '../../view-models/category-view-model';
export interface CreateCategoryControllerRequest {
  title: string;
}
export interface CreateCategoryControllerConstructorParams {
  createCategoryUseCase: ICreateCategoryUseCase;
}
export class CreateCategoryController implements Controller {
  constructor(
    private readonly params: CreateCategoryControllerConstructorParams,
  ) {}
  async handle(
    request: IHttpRequest<CreateCategoryControllerRequest>,
  ): Promise<IHttpResponse> {
    try {
      if (!request.body.title) {
        return HttpResponse.badRequest(new MissingParamError('title'));
      }
      if (!request.body.title.trim()) {
        return HttpResponse.badRequest(
          new InvalidParamError('title should not be empty'),
        );
      }
      if (!request.user?.sub) {
        return HttpResponse.serverError();
      }
      const category = await this.params.createCategoryUseCase.handle({
        title: request.body.title,
      });
      return HttpResponse.created(CategoryViewModel.toHTTP(category));
    } catch (error) {
      return ExceptionFilter.handle(error);
    }
  }
}
