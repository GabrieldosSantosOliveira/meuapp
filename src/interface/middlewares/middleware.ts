import { Payload } from '../auth';
import { IHttpRequest, IHttpResponse } from '../http';
export interface IMiddlewareResponse extends IHttpResponse {
  user?: Payload;
}
export interface IMiddleware {
  handle(request: Omit<IHttpRequest, 'user'>): Promise<IMiddlewareResponse>;
}
