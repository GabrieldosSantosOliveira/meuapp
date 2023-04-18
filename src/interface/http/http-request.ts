/* eslint-disable @typescript-eslint/no-explicit-any */
import { Payload } from '../auth';
export interface DefaultFieldType {
  [key: number | string | symbol]: any;
}
export interface IHttpRequest<
  T extends DefaultFieldType = DefaultFieldType,
  Q extends DefaultFieldType = DefaultFieldType,
  P extends DefaultFieldType = DefaultFieldType,
> {
  body: T;
  query: Q;
  params: P;
  accessToken?: string;
  user?: Payload;
}
