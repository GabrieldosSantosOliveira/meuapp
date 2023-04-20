import { HttpResponse } from '@/helpers/http';
import { Controller } from '@/interface/controller';
import {
  IHttpRequest,
  DefaultFieldType,
  IHttpResponse,
} from '@/interface/http';
import { IResetPasswordUseCase } from '@/interface/use-cases';
import { validate } from 'class-validator';

import { ResetPasswordBodyDto } from '../../dtos';
import { ExceptionFilter } from '../../error';
export interface ResetPasswordControllerBody {
  resetPasswordToken: string;
  email: string;
  passwordReset: string;
}
export interface ResetPasswordControllerConstructorParams {
  resetPasswordUseCase: IResetPasswordUseCase;
}
export class ResetPasswordController implements Controller {
  constructor(
    private readonly params: ResetPasswordControllerConstructorParams,
  ) {}
  async handle(
    request: IHttpRequest<
      ResetPasswordControllerBody,
      DefaultFieldType,
      DefaultFieldType
    >,
  ): Promise<IHttpResponse> {
    try {
      const resetPasswordBodyDto = new ResetPasswordBodyDto();
      Object.assign(resetPasswordBodyDto, request.body);
      const hasErrors = await validate(resetPasswordBodyDto);
      if (hasErrors.length > 0) {
        return HttpResponse.badRequest(hasErrors);
      }
      await this.params.resetPasswordUseCase.handle(resetPasswordBodyDto);
      return HttpResponse.noContent();
    } catch (error) {
      return ExceptionFilter.handle(error);
    }
  }
}
