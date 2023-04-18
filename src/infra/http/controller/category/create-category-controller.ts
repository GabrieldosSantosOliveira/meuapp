import { HttpResponse } from '@/helpers/http';
import {
  IHttpRequest,
  IHttpResponse,
  Controller,
  ICreateCategoryUseCase,
} from '@/interface/index';
import { InvalidParamError } from '@/utils/http';
import { validate } from 'class-validator';

import { CreateCategoryBodyDto } from '../../dtos';
import { ExceptionFilter } from '../../error';
import { CategoryViewModel } from '../../view-models';
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
      if (!request.user?.sub) {
        return HttpResponse.serverError();
      }
      const createCategoryBodyDto = new CreateCategoryBodyDto();
      Object.assign(createCategoryBodyDto, request.body);
      const hasErrors = await validate(createCategoryBodyDto);
      if (hasErrors.length > 0) {
        return HttpResponse.badRequest(hasErrors);
      }
      if (!createCategoryBodyDto.title.trim()) {
        return HttpResponse.badRequest(
          new InvalidParamError('title should not be empty').message,
        );
      }
      const category = await this.params.createCategoryUseCase.handle({
        title: createCategoryBodyDto.title,
      });
      return HttpResponse.created(CategoryViewModel.toHTTP(category));
    } catch (error) {
      return ExceptionFilter.handle(error);
    }
  }
}
