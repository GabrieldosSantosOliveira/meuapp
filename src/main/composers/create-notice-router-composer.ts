import { CreateNoticeUseCase } from '@/app/use-cases';
import {
  PrismaLoadAuthorByIdRepository,
  PrismaLoadCategoryByTitleRepository,
} from '@/infra/database/prisma';
import { PrismaCreateNoticeRepository } from '@/infra/database/prisma';
import { CreateNoticeController } from '@/infra/http/controller';

import { prismaService } from '../lib';

export class CreateNoticeRouterComposer {
  public static route() {
    const prismaLoadCategoryByTitleRepository =
      new PrismaLoadCategoryByTitleRepository(prismaService);
    const prismaCreateNoticeRepository = new PrismaCreateNoticeRepository(
      prismaService,
    );
    const prismaLoadAuthorByIdRepository = new PrismaLoadAuthorByIdRepository(
      prismaService,
    );
    const createNoticeUseCase = new CreateNoticeUseCase({
      loadAuthorByIdRepository: prismaLoadAuthorByIdRepository,
      createNoticeRepository: prismaCreateNoticeRepository,
      loadCategoryByTitleRepository: prismaLoadCategoryByTitleRepository,
    });

    const createNoticeController = new CreateNoticeController({
      createNoticeUseCase,
    });
    return { createNoticeController };
  }
}
