import {
  IAuthService,
  Hash,
  IAddAuthorWithEmailUseCase,
  IAddAuthorWithEmailUseCaseParams,
  IAddAuthorWithEmailUseCaseReturn,
} from '@/interface/index';
import { ConflictAuthorAlreadyExistsException } from '@/utils/index';

import { Author } from '../entities';
import {
  CreateAuthorRepository,
  LoadAuthorByEmailRepository,
} from '../repositories';
export interface AddAuthorWithEmailUseCaseParams {
  loadAuthorByEmailRepository: LoadAuthorByEmailRepository;
  createAuthorRepository: CreateAuthorRepository;
  hash: Hash;
  authService: IAuthService;
}
export class AddAuthorWithEmailUseCase implements IAddAuthorWithEmailUseCase {
  constructor(private readonly params: AddAuthorWithEmailUseCaseParams) {}
  async handle(
    data: IAddAuthorWithEmailUseCaseParams,
  ): Promise<IAddAuthorWithEmailUseCaseReturn> {
    const authorExists =
      await this.params.loadAuthorByEmailRepository.findByEmail(data.email);
    if (authorExists) {
      throw new ConflictAuthorAlreadyExistsException();
    }
    const hashPassword = await this.params.hash.hash(data.password);
    const author = new Author({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      picture: data.picture,
      password: hashPassword,
    });
    await this.params.createAuthorRepository.create(author);
    const { accessToken, refreshToken } =
      await this.params.authService.generateRefreshTokenAndAccessToken(
        author.id,
      );
    return { accessToken, refreshToken };
  }
}
