import { RemoveAuthorUseCase } from '@/app/use-cases/remove-author-use-case';
import {
  PrismaLoadAuthorByIdRepository,
  PrismaRemoveAuthorRepository,
} from '@/infra/database/prisma';
import { RemoveAuthorController } from '@/infra/http/controller/remove-author-controller';

import { prismaService } from '../lib';

export class RemoveAuthorRouterComposer {
  public static route() {
    const prismaRemoveAuthorRepository = new PrismaRemoveAuthorRepository(
      prismaService,
    );
    const prismaLoadAuthorByIdRepository = new PrismaLoadAuthorByIdRepository(
      prismaService,
    );
    const removeAuthorUseCase = new RemoveAuthorUseCase({
      loadAuthorByIdRepository: prismaLoadAuthorByIdRepository,
      removeAuthorRepository: prismaRemoveAuthorRepository,
    });
    const removeAuthorController = new RemoveAuthorController({
      removeAuthorUseCase,
    });
    return { removeAuthorController };
  }
}
