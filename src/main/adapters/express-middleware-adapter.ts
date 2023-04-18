import { ExceptionFilter } from '@/infra/http/error';
import { IHttpRequest, IMiddleware } from '@/interface/index';
import { NextFunction, Request, Response } from 'express';

export class ExpressMiddlewareAdapter {
  public static adapter(middleware: IMiddleware) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const httpRequest: IHttpRequest = {
          params: req.params,
          query: req.query,
          body: req.body,
          accessToken: req.headers.authorization?.split(' ')?.[1],
        };
        const httpResponse = await middleware.handle(httpRequest);
        if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
          req.user = httpResponse.user;
          return next();
        }
        res.status(httpResponse.statusCode).json(httpResponse.body);
      } catch (error) {
        const exception = ExceptionFilter.handle(error);
        res.status(exception.statusCode).json(exception.body);
      }
    };
  }
}
