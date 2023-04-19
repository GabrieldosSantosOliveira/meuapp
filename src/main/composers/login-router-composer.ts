import { LoginUseCase } from '@/app/use-cases';
import { PrismaLoadAuthorByEmailRepository } from '@/infra/database/prisma';
import { LoginController } from '@/infra/http/controller';

import { authService, bcryptAdapter, prismaService } from '../lib';

export class LoginRouterComposer {
  public static route() {
    const prismaLoadAuthorByEmailRepository =
      new PrismaLoadAuthorByEmailRepository(prismaService);
    const loginUseCase = new LoginUseCase({
      authService: authService,
      hashComparer: bcryptAdapter,
      loadAuthorByEmailRepository: prismaLoadAuthorByEmailRepository,
    });
    const loginController = new LoginController({ loginUseCase: loginUseCase });
    return { loginController };
  }
}
