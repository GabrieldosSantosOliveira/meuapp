import { CreateCategoryUseCase } from '@/app/use-cases/category/create-category-use-case';
import {
  PrismaCreateCategoryRepository,
  PrismaLoadCategoryByTitleRepository,
} from '@/infra/database/prisma';
import { CreateCategoryController } from '@/infra/http/controller/category/create-category-controller';

import { prismaService } from '../lib';

export class CreateCategoryRouterComposer {
  public static route() {
    const prismaLoadCategoryByTitleRepository =
      new PrismaLoadCategoryByTitleRepository(prismaService);
    const prismaCreateCategoryRepository = new PrismaCreateCategoryRepository(
      prismaService,
    );
    const createCategoryUseCase = new CreateCategoryUseCase({
      createCategoryRepository: prismaCreateCategoryRepository,
      loadCategoryByTitleRepository: prismaLoadCategoryByTitleRepository,
    });
    const createCategoryController = new CreateCategoryController({
      createCategoryUseCase: createCategoryUseCase,
    });
    return { createCategoryController };
  }
}
