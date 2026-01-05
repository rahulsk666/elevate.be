import { IsIn, IsOptional, IsString } from 'class-validator';
import type { roadmapStatus } from '../types/roadmap-status.types';

export class CreateRoadmapDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  subtitle?: string;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsString()
  @IsIn(['draft', 'published', 'archived'])
  @IsOptional()
  roadmap_status: roadmapStatus = 'draft';
}
