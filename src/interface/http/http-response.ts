export interface IHttpResponse<T = unknown> {
  body: T;
  statusCode: number;
}
