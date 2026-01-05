import { IsIn, IsOptional, IsString, IsUrl } from 'class-validator';
import type { lessonType } from '../types/lesson-type.types';

export class CreateLessonDto {
  @IsString()
  title: string;

  @IsUrl()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsString()
  @IsIn(['link', 'pdf', 'repo', 'note'])
  @IsOptional()
  lesson_type: lessonType = 'link';
}
