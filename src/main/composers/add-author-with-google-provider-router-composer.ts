import { AddAuthorWithGoogleProviderUseCase } from '@/app/use-cases';
import {
  PrismaCreateAuthorRepository,
  PrismaLoadAuthorByEmailRepository,
  PrismaSaveAuthorRepository,
} from '@/infra/database/prisma';
import { AddAuthorWithGoogleProviderController } from '@/infra/http/controller';
import { AxiosHttpService } from '@/infra/http/service/axios-http-service';

import { prismaService, authService } from '../lib';

export class AddAuthorWithGoogleProviderRouterComposer {
  public static route() {
    const prismaCreateAuthorRepository = new PrismaCreateAuthorRepository(
      prismaService,
    );
    const prismaLoadAuthorByEmailRepository =
      new PrismaLoadAuthorByEmailRepository(prismaService);
    const prismaSaveAuthorRepository = new PrismaSaveAuthorRepository(
      prismaService,
    );
    const axiosHttpService = new AxiosHttpService();
    const addAuthorWithGoogleProviderUseCase =
      new AddAuthorWithGoogleProviderUseCase({
        authService,
        createAuthorRepository: prismaCreateAuthorRepository,
        loadAuthorByEmailRepository: prismaLoadAuthorByEmailRepository,
        httpService: axiosHttpService,
        saveAuthorRepository: prismaSaveAuthorRepository,
      });
    const addAuthorWithGoogleProviderController =
      new AddAuthorWithGoogleProviderController({
        addAuthorWithGoogleProviderUseCase: addAuthorWithGoogleProviderUseCase,
      });
    return { addAuthorWithGoogleProviderController };
  }
}
