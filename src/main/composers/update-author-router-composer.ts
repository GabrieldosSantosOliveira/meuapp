import { UpdateAuthorUseCase } from '@/app/use-cases';
import {
  PrismaLoadAuthorByIdRepository,
  PrismaSaveAuthorRepository,
} from '@/infra/database/prisma';
import { UpdateAuthorController } from '@/infra/http/controller';

import { prismaService } from '../lib';

export class UpdateAuthorRouterComposer {
  public static route() {
    const updateAuthorUseCase = new UpdateAuthorUseCase({
      saveAuthorRepository: new PrismaSaveAuthorRepository(prismaService),
      loadAuthorByIdRepository: new PrismaLoadAuthorByIdRepository(
        prismaService,
      ),
    });
    const updateAuthorController = new UpdateAuthorController({
      updateAuthorUseCase,
    });
    return { updateAuthorController };
  }
}
