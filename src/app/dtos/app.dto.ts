import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class JsonDto {
  @IsString()
  apiName: string;

  @IsString()
  apiRoute: string;

  @IsString()
  apiMethod: string;

  @IsString()
  apiDescription: string;

  @IsString()
  @IsOptional()
  apiBody: string;

  @IsOptional()
  @IsString()
  schema: string;

  @IsBoolean()
  refresh: boolean;

  @IsBoolean()
  limitOffset: boolean;
}
