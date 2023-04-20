import { ForgotPasswordUseCase } from '@/app/use-cases';
import {
  PrismaLoadAuthorByEmailRepository,
  PrismaSaveAuthorRepository,
} from '@/infra/database/prisma';
import { ForgotPasswordController } from '@/infra/http/controller';
import { NodeMailerProvider } from '@/infra/implementations/mail/nodemalier-provider';
import { ServiceRandomNumber } from '@/infra/service/service-random-number';

import { env } from '../config';
import { prismaService } from '../lib';

export class ForgotPasswordRouterComposer {
  public static route() {
    const prismaLoadAuthorByEmailRepository =
      new PrismaLoadAuthorByEmailRepository(prismaService);
    const prismaSaveAuthorRepository = new PrismaSaveAuthorRepository(
      prismaService,
    );
    const serviceRandomNumber = new ServiceRandomNumber();
    const nodemailerProvider = new NodeMailerProvider({
      transport: {
        host: env.MAIL_HOST,
        port: env.MAIL_PORT,
        secure: env.MAIL_SECURE,
        auth: {
          user: env.MAIL_AUTH_USER,
          pass: env.MAIL_AUTH_PASS,
        },
      },
    });
    const forgotPasswordUseCase = new ForgotPasswordUseCase({
      loadAuthorByEmailRepository: prismaLoadAuthorByEmailRepository,
      saveAuthorRepository: prismaSaveAuthorRepository,
      serviceRandomNumber,
      mailProvider: nodemailerProvider,
    });

    const forgotPasswordController = new ForgotPasswordController({
      forgotPasswordUseCase,
    });
    return { forgotPasswordController };
  }
}
