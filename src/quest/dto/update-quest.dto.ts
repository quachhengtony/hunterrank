import { Level } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class UpdateQuestDto {
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
  @IsDate()
  startAt: Date;

  @IsString()
  @IsNotEmpty()
  @IsDate()
  endAt: Date;
}
