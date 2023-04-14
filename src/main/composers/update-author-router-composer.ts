import { UpdateAuthorUseCase } from '@/app/use-cases';
import {
  PrismaLoadAuthorByIdRepository,
  PrismaSaveAuthorRepository,
} from '@/infra/database/prisma';
import { UpdateAuthorController } from '@/infra/http/controller/update-author-controller';
import { EmailValidatorAdapter } from '@/validations/email-validator';
import { UrlValidatorAdapter } from '@/validations/url-validator';

import { prismaService } from '../lib';

export class UpdateAuthorRouterComposer {
  public static route() {
    const urlValidatorAdapter = new UrlValidatorAdapter();
    const updateAuthorUseCase = new UpdateAuthorUseCase({
      saveAuthorRepository: new PrismaSaveAuthorRepository(prismaService),
      loadAuthorByIdRepository: new PrismaLoadAuthorByIdRepository(
        prismaService,
      ),
    });
    const emailValidatorAdapter = new EmailValidatorAdapter();
    const updateAuthorController = new UpdateAuthorController({
      urlValidator: urlValidatorAdapter,
      updateAuthorUseCase,
      emailValidator: emailValidatorAdapter,
    });
    return { updateAuthorController };
  }
}
