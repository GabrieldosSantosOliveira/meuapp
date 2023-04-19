import { GetAllNoticeByCategoryUseCase } from '@/app/use-cases';
import {
  PrismaLoadAllNoticeByCategoryRepository,
  PrismaLoadCategoryByTitleRepository,
} from '@/infra/database/prisma';
import { PrismaCountNoticeByCategoryRepository } from '@/infra/database/prisma/repositories/notice/prisma-count-notice-by-category-repository';
import { GetAllNoticeByCategoryController } from '@/infra/http/controller';

import { env } from '../config';
import { prismaService } from '../lib';

export class GetAllNoticeByCategoryRouterComposer {
  public static route() {
    const prismaCountNoticeByCategoryRepository =
      new PrismaCountNoticeByCategoryRepository(prismaService);
    const prismaLoadAllNoticeByCategoryRepository =
      new PrismaLoadAllNoticeByCategoryRepository(prismaService);
    const prismaLoadCategoryByTitleRepository =
      new PrismaLoadCategoryByTitleRepository(prismaService);
    const getAllNoticeByCategoryUseCase = new GetAllNoticeByCategoryUseCase({
      countNoticeByCategoryRepository: prismaCountNoticeByCategoryRepository,
      loadAllNoticeByCategoryRepository:
        prismaLoadAllNoticeByCategoryRepository,
      loadCategoryByTitleRepository: prismaLoadCategoryByTitleRepository,
    });
    const getAllNoticeByCategoryController =
      new GetAllNoticeByCategoryController({
        BASE_URL: env.BASE_URL,
        SIZE_FOR_PAGE: env.SIZE_FOR_PAGE,
        getAllNoticeByCategoryUseCase: getAllNoticeByCategoryUseCase,
      });
    return { getAllNoticeByCategoryController };
  }
}
