import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryBodyDto {
  @IsString()
  @IsNotEmpty()
  public title: string;
}
