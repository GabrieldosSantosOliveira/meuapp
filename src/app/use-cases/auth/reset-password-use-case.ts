import {
  LoadAuthorByEmailRepository,
  SaveAuthorRepository,
} from '@/app/repositories';
import { Hash } from '@/interface/cryptography';
import {
  IResetPasswordUseCase,
  IResetPasswordUseCaseRequest,
} from '@/interface/use-cases';
import { AuthorNotFoundException, UnauthorizedException } from '@/utils/http';
export interface ResetPasswordUseCaseConstructorParams {
  loadAuthorByEmailRepository: LoadAuthorByEmailRepository;
  saveAuthorRepository: SaveAuthorRepository;
  hash: Hash;
}
export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(private readonly params: ResetPasswordUseCaseConstructorParams) {}
  async handle(data: IResetPasswordUseCaseRequest): Promise<void> {
    const authorExists =
      await this.params.loadAuthorByEmailRepository.findByEmail(data.email);
    if (!authorExists) {
      throw new AuthorNotFoundException();
    }
    const isValidResetPasswordToken =
      authorExists.resetPasswordToken === data.resetPasswordToken;
    if (!isValidResetPasswordToken) {
      throw new UnauthorizedException();
    }
    if (!authorExists.resetPasswordExpires) {
      throw new UnauthorizedException();
    }
    const nowDate = new Date();
    const isExpiresResetPasswordExpires =
      nowDate <= authorExists.resetPasswordExpires;
    if (!isExpiresResetPasswordExpires) {
      throw new UnauthorizedException();
    }
    const resetPasswordHash = await this.params.hash.hash(data.passwordReset);
    authorExists.resetPassword(resetPasswordHash);
    await this.params.saveAuthorRepository.save(authorExists);
  }
}
