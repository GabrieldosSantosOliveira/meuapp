import { IsNotEmpty, IsString } from 'class-validator';

export class AddAuthorWithGoogleProviderBodyDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
