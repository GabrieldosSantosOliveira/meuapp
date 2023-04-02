import { Payload } from '../auth';
import { IHttpRequest, IHttpResponse } from '../http';

export interface IMiddleware {
  handle(request: Omit<IHttpRequest, 'user'>): Promise<
    IHttpResponse & {
      user?: Payload;
    }
  >;
}
