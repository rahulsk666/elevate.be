import { IsIn, IsOptional, IsString, IsUrl } from 'class-validator';
import type { lessonType } from '../types/lesson-type.types';

export class CreateLessonDto {
  @IsString()
  title: string;

  @IsUrl()
  url?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsIn(['link', 'pdf', 'repo', 'note'])
  @IsOptional()
  lessonType: lessonType = 'link';
}
