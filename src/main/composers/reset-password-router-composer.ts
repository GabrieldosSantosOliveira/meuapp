import { ResetPasswordUseCase } from '@/app/use-cases';
import {
  PrismaLoadAuthorByEmailRepository,
  PrismaSaveAuthorRepository,
} from '@/infra/database/prisma';
import { ResetPasswordController } from '@/infra/http/controller';

import { bcryptAdapter, prismaService } from '../lib';

export class ResetPasswordRouterComposer {
  public static route() {
    const prismaLoadAuthorByEmailRepository =
      new PrismaLoadAuthorByEmailRepository(prismaService);
    const prismaSaveAuthorRepository = new PrismaSaveAuthorRepository(
      prismaService,
    );
    const resetPasswordUseCase = new ResetPasswordUseCase({
      hash: bcryptAdapter,
      loadAuthorByEmailRepository: prismaLoadAuthorByEmailRepository,
      saveAuthorRepository: prismaSaveAuthorRepository,
    });
    const resetPasswordController = new ResetPasswordController({
      resetPasswordUseCase,
    });
    return { resetPasswordController };
  }
}
