import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginBodyDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
