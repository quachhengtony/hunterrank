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

export class CreateQuestDto {
  @IsString()
  @IsNotEmpty()
  @Length(20, 70)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Length(20, 1000)
  description: string;

  @IsNumber()
  @IsNotEmpty()
  reward: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Level)
  difficultyLevel: Level;

  @IsString()
  @IsNotEmpty()
  @IsUrl()
  location: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  startAt: string;

  @IsString()
  @IsNotEmpty()
  @IsDateString()
  endAt: string;
}
