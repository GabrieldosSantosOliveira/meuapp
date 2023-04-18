import { AddAuthorWithEmailUseCase } from '@/app/use-cases';
import {
  PrismaCreateAuthorRepository,
  PrismaLoadAuthorByEmailRepository,
} from '@/infra/database/prisma';
import { AddAuthorWithEmailController } from '@/infra/http/controller';

import { bcryptAdapter } from '../lib/cryptography/bcrypt-adapter';
import { prismaService } from '../lib/database/prisma';
import { authService } from './../lib/cryptography/auth-service';
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
