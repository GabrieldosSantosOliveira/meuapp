import { Payload } from '../interface';

declare global {
  namespace Express {
    export interface Request {
      user?: Payload;
    }
  }
}
