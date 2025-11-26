import { IsIn, IsOptional, IsString, IsUUID } from 'class-validator';
import type { courseStatus } from '../types/course-status.types';

export class FindParamDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsIn(['draft', 'published', 'archived'])
  @IsOptional()
  status: courseStatus;

  @IsUUID()
  @IsOptional()
  createdBy: string;
}
