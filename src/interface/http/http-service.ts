/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IHttpServiceResponse<T = any> {
  statusCode: number;
  data: T;
}
export interface IHttpServiceOptions {
  headers?: IHttpServiceOptionsHeader;
}
export interface IHttpServiceOptionsHeader {
  Authorization: string;
}
export interface IHttpService {
  get<T = any>(
    url: string,
    options?: IHttpServiceOptions,
  ): Promise<IHttpServiceResponse<T>>;
}
