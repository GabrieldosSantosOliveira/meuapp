import { GetAuthorUseCase } from '@/app/use-cases';
import { PrismaLoadAuthorByIdRepository } from '@/infra/database/prisma';
import { GetAuthorController } from '@/infra/http/controller';

import { prismaService } from '../lib';
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
