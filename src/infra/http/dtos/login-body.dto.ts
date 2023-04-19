import { IsEmail, IsString } from 'class-validator';

export class LoginBodyDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
