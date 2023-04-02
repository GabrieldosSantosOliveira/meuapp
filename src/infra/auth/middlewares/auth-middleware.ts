import { HttpResponse, HttpStatus } from '@/helpers/http';
import { IAuthService, Payload } from '@/interface/auth';
import { IHttpRequest, IHttpResponse } from '@/interface/http';
import { IMiddleware } from '@/interface/middlewares/middleware';
import { DefaultFieldType } from '@/interface/validations';
export interface AuthMiddlewareParams {
  authService: IAuthService;
}
export class AuthMiddleware implements IMiddleware {
  constructor(private readonly params: AuthMiddlewareParams) {}
  async handle(request: IHttpRequest<DefaultFieldType>): Promise<
    IHttpResponse & {
      user?: Payload;
    }
  > {
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
