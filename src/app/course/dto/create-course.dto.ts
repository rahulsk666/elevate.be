import { IsIn, IsOptional, IsString, IsUrl } from 'class-validator';
import type { courseStatus } from '../types/course-status.types';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  subtitle?: string | null;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsUrl()
  @IsOptional()
  thumbnailUrl?: string | null;

  @IsString()
  @IsIn(['draft', 'published', 'archived'])
  @IsOptional()
  status: courseStatus = 'draft';
}
