import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class UpdateAuthorBodyDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  @IsOptional()
  public lastName?: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  @IsOptional()
  public firstName?: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  @IsOptional()
  public picture?: string;
}
