import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordBodyDto {
  @IsString()
  @IsNotEmpty()
  resetPasswordToken: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  passwordReset: string;
}
