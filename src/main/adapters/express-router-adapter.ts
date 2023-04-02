import { Controller } from '@/interface/controller';
import { IHttpRequest } from '@/interface/http';
import { Request, Response } from 'express';

export class ExpressRouterAdapter {
  public static adapter(controller: Controller) {
    return async (req: Request, res: Response) => {
      const httpRequest: IHttpRequest = {
        body: req.body,
      };
      const httpResponse = await controller.handle(httpRequest);
      res.status(httpResponse.statusCode).json(httpResponse.body);
    };
  }
}
