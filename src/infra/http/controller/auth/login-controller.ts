import { HttpResponse } from '@/helpers/http';
import { Controller } from '@/interface/controller';
import {
  IHttpRequest,
  DefaultFieldType,
  IHttpResponse,
} from '@/interface/http';
import { ILoginUseCase } from '@/interface/use-cases';
import { validate } from 'class-validator';

import { LoginBodyDto } from '../../dtos';
import { ExceptionFilter } from '../../error';
export interface LoginControllerBody {
  email: string;
  password: string;
}
export interface LoginControllerConstructorParams {
  loginUseCase: ILoginUseCase;
}
export class LoginController implements Controller {
  constructor(private readonly params: LoginControllerConstructorParams) {}
  async handle(
    request: IHttpRequest<
      LoginControllerBody,
      DefaultFieldType,
      DefaultFieldType
    >,
  ): Promise<IHttpResponse> {
    try {
      const loginBodyDto = new LoginBodyDto();
      Object.assign(loginBodyDto, request.body);
      const hasErrors = await validate(loginBodyDto);
      if (hasErrors.length > 0) {
        return HttpResponse.badRequest(hasErrors);
      }
      const { accessToken } = await this.params.loginUseCase.handle({
        email: loginBodyDto.email,
        password: loginBodyDto.password,
      });
      return HttpResponse.ok({ accessToken });
    } catch (error) {
      return ExceptionFilter.handle(error);
    }
  }
}
