import { HttpResponse, HttpStatus } from '@/helpers/http';
import {
  DefaultFieldType,
  IMiddleware,
  IHttpRequest,
  IAuthService,
  IMiddlewareResponse,
} from '@/interface/index';
export interface AuthMiddlewareParams {
  authService: IAuthService;
}

export class AuthMiddleware implements IMiddleware {
  constructor(private readonly params: AuthMiddlewareParams) {}
  async handle(
    request: IHttpRequest<DefaultFieldType>,
  ): Promise<IMiddlewareResponse> {
    if (!request.accessToken) {
      return HttpResponse.unauthorizedError();
    }
    const { sub } = await this.params.authService.decryptAccessToken(
      request.accessToken as string,
    );
    if (sub) {
      return { user: { sub }, statusCode: HttpStatus.OK, body: undefined };
    }
    return HttpResponse.unauthorizedError();
  }
}
