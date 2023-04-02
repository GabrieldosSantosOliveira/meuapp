import { GetAuthorUseCase } from '@/app/use-cases/get-author-use-case';
import { PrismaLoadAuthorByIdRepository } from '@/infra/database/prisma';
import { GetAuthorController } from '@/infra/http/controller/get-author-controller';

import { prismaService } from '../lib/database/prisma';
export class GetAuthorRouterComposer {
  public static route() {
    const loadAuthorByIdRepository = new PrismaLoadAuthorByIdRepository(
      prismaService,
    );
    const getAuthorUseCase = new GetAuthorUseCase({
      loadAuthorByIdRepository,
    });
    const getAuthorController = new GetAuthorController({
      getAuthorUseCase,
    });
    return { getAuthorController };
  }
}
