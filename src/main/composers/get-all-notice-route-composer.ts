import { GetAllNoticeUseCase } from '@/app/use-cases';
import {
  PrismaCountNoticeRepository,
  PrismaLoadAllNoticeRepository,
} from '@/infra/database/prisma';
import { GetAllNoticeController } from '@/infra/http/controller';

import { env } from '../config';
import { prismaService } from '../lib';

export class GetAllNoticeRouterComposer {
  public static route() {
    const prismaLoadAllNoticeRepository = new PrismaLoadAllNoticeRepository(
      prismaService,
    );
    const prismaCountNoticeRepository = new PrismaCountNoticeRepository(
      prismaService,
    );
    const getAllNoticeUseCase = new GetAllNoticeUseCase({
      loadAllNoticeRepository: prismaLoadAllNoticeRepository,
      countNoticeRepository: prismaCountNoticeRepository,
    });
    const getAllNoticeController = new GetAllNoticeController({
      getAllNoticeUseCase: getAllNoticeUseCase,
      BASE_URL: env.BASE_URL,
      SIZE_FOR_PAGE: env.SIZE_FOR_PAGE,
    });
    return { getAllNoticeController };
  }
}
