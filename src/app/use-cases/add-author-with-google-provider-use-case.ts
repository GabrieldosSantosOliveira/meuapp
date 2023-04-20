import { IAuthService } from '@/interface/auth';
import { IHttpService } from '@/interface/http';
import {
  IAddAuthorWithGoogleProviderUseCase,
  IAddAuthorWithGoogleProviderUseCaseResponse,
} from '@/interface/use-cases';
import { UnauthorizedException } from '@/utils/http';

import { Author } from '../entities';
import {
  CreateAuthorRepository,
  LoadAuthorByEmailRepository,
  SaveAuthorRepository,
} from '../repositories';
export interface AddAuthorWithGoogleProviderUseCaseConstructorParams {
  loadAuthorByEmailRepository: LoadAuthorByEmailRepository;
  createAuthorRepository: CreateAuthorRepository;
  saveAuthorRepository: SaveAuthorRepository;
  httpService: IHttpService;
  authService: IAuthService;
}
export interface UserGoogleResponseDto {
  id: string;
  email: string;
  family_name: string;
  given_name: string;
  picture: string;
}
export class AddAuthorWithGoogleProviderUseCase
  implements IAddAuthorWithGoogleProviderUseCase
{
  constructor(
    private readonly params: AddAuthorWithGoogleProviderUseCaseConstructorParams,
  ) {}
  async handle(
    accessToken: string,
  ): Promise<IAddAuthorWithGoogleProviderUseCaseResponse> {
    const { data } = await this.getUserGoogle(accessToken);
    const authorExists =
      await this.params.loadAuthorByEmailRepository.findByEmail(data.email);
    if (authorExists) {
      authorExists.googleId = data.id;
      authorExists.updatedAt = new Date();
      await this.params.saveAuthorRepository.save(authorExists);
      const { accessToken, refreshToken } =
        await this.params.authService.generateRefreshTokenAndAccessToken(
          authorExists.id,
        );
      return { accessToken, refreshToken };
    }
    const author = new Author({
      email: data.email,
      firstName: data.given_name,
      lastName: data.family_name,
      googleId: data.id,
      picture: data.picture,
    });
    await this.params.createAuthorRepository.create(author);
    const refreshTokenAndAccessToken =
      await this.params.authService.generateRefreshTokenAndAccessToken(
        author.id,
      );
    return refreshTokenAndAccessToken;
  }
  async getUserGoogle(accessToken: string) {
    try {
      return await this.params.httpService.get<UserGoogleResponseDto>(
        'https://www.googleapis.com/oauth2/v2/userinfo',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch {
      throw new UnauthorizedException();
    }
  }
}
