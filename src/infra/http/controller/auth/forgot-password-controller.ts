import { HttpResponse } from '@/helpers/http';
import { Controller } from '@/interface/controller';
import {
  IHttpRequest,
  DefaultFieldType,
  IHttpResponse,
} from '@/interface/http';
import { IForgotPasswordUseCase } from '@/interface/use-cases';
import { validate } from 'class-validator';

import { ForgotPasswordBodyDto } from '../../dtos';
import { ExceptionFilter } from '../../error';
export interface ForgotPasswordControllerBody {
  email: string;
}
export interface ForgotPasswordControllerConstructorParams {
  forgotPasswordUseCase: IForgotPasswordUseCase;
}
export class ForgotPasswordController implements Controller {
  constructor(
    private readonly params: ForgotPasswordControllerConstructorParams,
  ) {}
  async handle(
    request: IHttpRequest<
      ForgotPasswordControllerBody,
      DefaultFieldType,
      DefaultFieldType
    >,
  ): Promise<IHttpResponse> {
    try {
      const forgotPasswordBodyDto = new ForgotPasswordBodyDto();
      Object.assign(forgotPasswordBodyDto, request.body);
      const hasErrors = await validate(forgotPasswordBodyDto);
      if (hasErrors.length > 0) {
        return HttpResponse.badRequest(hasErrors);
      }
      await this.params.forgotPasswordUseCase.handle(forgotPasswordBodyDto);
      return HttpResponse.noContent();
    } catch (error) {
      return ExceptionFilter.handle(error);
    }
  }
}
