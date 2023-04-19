import { HttpResponse } from '@/helpers/http';
import { Controller } from '@/interface/controller';
import {
  IHttpRequest,
  DefaultFieldType,
  IHttpResponse,
} from '@/interface/http';
import { IAddAuthorWithGoogleProviderUseCase } from '@/interface/use-cases';
import { validate } from 'class-validator';

import { AddAuthorWithGoogleProviderBodyDto } from '../dtos';
import { ExceptionFilter } from '../error';
export interface AddAuthorWithGoogleProviderControllerBody {
  accessToken: string;
}
export interface AddAuthorWithGoogleProviderConstructorParams {
  addAuthorWithGoogleProviderUseCase: IAddAuthorWithGoogleProviderUseCase;
}
export class AddAuthorWithGoogleProviderController implements Controller {
  constructor(
    private readonly params: AddAuthorWithGoogleProviderConstructorParams,
  ) {}
  async handle(
    request: IHttpRequest<
      AddAuthorWithGoogleProviderControllerBody,
      DefaultFieldType,
      DefaultFieldType
    >,
  ): Promise<IHttpResponse> {
    try {
      const addAuthorWithGoogleProviderBodyDto =
        new AddAuthorWithGoogleProviderBodyDto();
      Object.assign(addAuthorWithGoogleProviderBodyDto, request.body);
      const hasErrors = await validate(addAuthorWithGoogleProviderBodyDto);
      if (hasErrors.length > 0) {
        return HttpResponse.badRequest(hasErrors);
      }
      const { accessToken, refreshToken } =
        await this.params.addAuthorWithGoogleProviderUseCase.handle(
          addAuthorWithGoogleProviderBodyDto.accessToken,
        );
      return HttpResponse.ok({ accessToken, refreshToken });
    } catch (error) {
      return ExceptionFilter.handle(error);
    }
  }
}
