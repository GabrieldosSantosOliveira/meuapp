import {
  IsEmail,
  IsString,
  Length,
  IsNotEmpty,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class AddAuthorWithEmailBodyDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  public lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @IsOptional()
  public picture?: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  public password: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Length(5, 255)
  public email: string;
}
