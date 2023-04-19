import { LoadAuthorByEmailRepository } from '@/app/repositories';
import { IAuthService } from '@/interface/auth';
import { HashComparer } from '@/interface/cryptography';
import {
  ILoginUseCase,
  ILoginUseCaseRequest,
  ILoginUseCaseResponse,
} from '@/interface/use-cases';
import { AuthorNotFoundException, UnauthorizedException } from '@/utils/http';
export interface LoginUseCaseConstructorParams {
  loadAuthorByEmailRepository: LoadAuthorByEmailRepository;
  hashComparer: HashComparer;
  authService: IAuthService;
}
export class LoginUseCase implements ILoginUseCase {
  constructor(private readonly params: LoginUseCaseConstructorParams) {}
  async handle(data: ILoginUseCaseRequest): Promise<ILoginUseCaseResponse> {
    const authorExists =
      await this.params.loadAuthorByEmailRepository.findByEmail(data.email);
    if (!authorExists) {
      throw new AuthorNotFoundException();
    }
    if (!authorExists.password) {
      throw new UnauthorizedException();
    }
    const isValidPassword = await this.params.hashComparer.compare(
      data.password,
      authorExists.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }
    const { accessToken, refreshToken } =
      await this.params.authService.generateRefreshTokenAndAccessToken(
        authorExists.id,
      );
    return { accessToken, refreshToken };
  }
}
