import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateDto {
  @IsString()
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsOptional()
  secondname?: string;

  @IsString()
  @IsOptional()
  surname?: string;

  @IsString()
  @IsOptional()
  group?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  jobName?: string;

  @IsString()
  @IsOptional()
  cellNumber?: string;

  @IsOptional()
  @IsArray()
  photos?: string[];

  @IsString()
  @IsOptional()
  profilePhoto?: string;
}
