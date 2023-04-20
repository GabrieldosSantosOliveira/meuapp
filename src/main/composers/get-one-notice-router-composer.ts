import { GetOneNoticeUseCase } from '@/app/use-cases';
import { PrismaLoadNoticeByIdRepository } from '@/infra/database/prisma';
import { GetOneNoticeController } from '@/infra/http/controller';

import { prismaService } from '../lib';
export class GetOneNoticeRouterComposer {
  public static route() {
    const prismaLoadNoticeByIdRepository = new PrismaLoadNoticeByIdRepository(
      prismaService,
    );
    const getOneNoticeUseCase = new GetOneNoticeUseCase({
      loadNoticeByIdRepository: prismaLoadNoticeByIdRepository,
    });
    const getOneNoticeController = new GetOneNoticeController({
      getOneNoticeUseCase: getOneNoticeUseCase,
    });
    return { getOneNoticeController };
  }
}
