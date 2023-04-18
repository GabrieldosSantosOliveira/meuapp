import { AddAuthorWithEmailUseCase } from '@/app/use-cases';
import {
  PrismaCreateAuthorRepository,
  PrismaLoadAuthorByEmailRepository,
} from '@/infra/database/prisma';
import { AddAuthorWithEmailController } from '@/infra/http/controller';

import { bcryptAdapter, prismaService, authService } from '../lib';

export class AddAuthorWithEmailRouterComposer {
  public static route() {
    const prismaCreateAuthorRepository = new PrismaCreateAuthorRepository(
      prismaService,
    );
    const prismaLoadAuthorByEmailRepository =
      new PrismaLoadAuthorByEmailRepository(prismaService);
    const addAuthorWithEmailUseCase = new AddAuthorWithEmailUseCase({
      authService,
      createAuthorRepository: prismaCreateAuthorRepository,
      hash: bcryptAdapter,
      loadAuthorByEmailRepository: prismaLoadAuthorByEmailRepository,
    });
    const addAuthorWithEmailController = new AddAuthorWithEmailController({
      addAuthorWithEmailUseCase: addAuthorWithEmailUseCase,
    });
    return { addAuthorWithEmailController };
  }
}
