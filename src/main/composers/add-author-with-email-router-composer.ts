import { AddAuthorWithEmailUseCase } from '@/app/use-cases/add-author-with-email-use-case';
import {
  PrismaCreateAuthorRepository,
  PrismaLoadAuthorByEmailRepository,
} from '@/infra/database/prisma';
import { AddAuthorWithEmailController } from '@/infra/http/controller/add-author-with-email-controller';
import {
  ValidateMissingParamsAdapter,
  EmailValidatorAdapter,
} from '@/validations/index';

import { bcryptAdapter } from '../lib/cryptography/bcrypt-adapter';
import { prismaService } from '../lib/database/prisma';
import { authService } from './../lib/cryptography/auth-service';
export class AddAuthorWithEmailRouterComposer {
  public static route() {
    const validateMissingParamsAdapter = new ValidateMissingParamsAdapter();
    const emailValidatorAdapter = new EmailValidatorAdapter();

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
      validateMissingParams: validateMissingParamsAdapter,
      addAuthorWithEmailUseCase: addAuthorWithEmailUseCase,
      emailValidator: emailValidatorAdapter,
    });
    return { addAuthorWithEmailController };
  }
}
