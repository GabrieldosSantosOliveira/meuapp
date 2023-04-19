import { HttpResponse } from '@/helpers/http';
import { Controller } from '@/interface/controller';
import {
  IHttpRequest,
  DefaultFieldType,
  IHttpResponse,
} from '@/interface/http';
import { IRefreshTokenUseCase } from '@/interface/use-cases';
import { MissingParamError } from '@/utils/http';

import { ExceptionFilter } from '../../error';
export interface RefreshTokenControllerBody {
  refreshToken: string;
}
export interface RefreshTokenControllerConstructorParams {
  refreshTokenUseCase: IRefreshTokenUseCase;
}
export class RefreshTokenController implements Controller {
  constructor(
    private readonly params: RefreshTokenControllerConstructorParams,
  ) {}
  async handle(
    request: IHttpRequest<
      RefreshTokenControllerBody,
      DefaultFieldType,
      DefaultFieldType
    >,
  ): Promise<IHttpResponse> {
    try {
      if (!request.body.refreshToken) {
        return HttpResponse.badRequest(
          new MissingParamError('refreshToken').message,
        );
      }
      const { accessToken } = await this.params.refreshTokenUseCase.handle(
        request.body.refreshToken,
      );
      return HttpResponse.ok({ accessToken });
    } catch (error) {
      return ExceptionFilter.handle(error);
    }
  }
}
