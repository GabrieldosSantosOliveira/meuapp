import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

export class CreateNoticeBodyDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  public image: string;

  @IsString()
  @IsNotEmpty()
  public category: string;
  @IsArray()
  @IsNotEmpty()
  @ValidateNested()
  @ArrayMinSize(1)
  public content: CreateContentBodyDto[];
}
export class CreateContentBodyDto {
  @IsString()
  @IsNotEmpty()
  public text: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public heading?: string;
}
