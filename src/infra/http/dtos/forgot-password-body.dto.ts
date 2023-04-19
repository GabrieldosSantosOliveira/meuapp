import { IsEmail, IsString } from 'class-validator';

export class ForgotPasswordBodyDto {
  @IsString()
  @IsEmail()
  email: string;
}
