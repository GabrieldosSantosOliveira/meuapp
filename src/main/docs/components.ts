import {
  badRequest,
  notFound,
  serverError,
  unauthorizedError,
  conflictError,
} from './components/index';
import { securitySchema } from './schemas/index';

export const components = {
  securitySchemes: {
    bearerAuth: securitySchema,
  },
  badRequest,
  notFound,
  serverError,
  unauthorizedError,
  conflictError,
};
