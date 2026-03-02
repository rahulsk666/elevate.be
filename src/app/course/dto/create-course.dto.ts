import { IsIn, IsOptional, IsString, IsUrl } from 'class-validator';
import type { courseStatus } from '../types/course-status.types';

export class CreateCourseDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  thumbnailUrl?: string;

  @IsString()
  @IsIn(['draft', 'published', 'archived'])
  @IsOptional()
  status: courseStatus = 'draft';
}
