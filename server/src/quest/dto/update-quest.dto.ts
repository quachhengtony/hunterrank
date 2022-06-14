import { Level } from '@prisma/client';
import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class UpdateQuestDto {
  @IsString()
  @IsOptional()
  @Length(20, 70)
  title?: string;

  @IsString()
  @IsOptional()
  @Length(20, 1000)
  description?: string;

  @IsNumber()
  @IsOptional()
  reward?: number;

  @IsString()
  @IsOptional()
  @IsEnum(Level)
  difficultyLevel?: Level;

  @IsString()
  @IsOptional()
  @IsUrl()
  location?: string;

  @IsString()
  @IsOptional()
  @IsDateString()
  startAt?: string;

  @IsString()
  @IsOptional()
  @IsDateString()
  endAt?: string;
}
