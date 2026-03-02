import { PoolClient } from 'pg';
import { Roadmap } from '../entities/roadmap.entity';
import { CreateRoadmapRecord } from '../types/create-roadmap-record.types';
import { UpdateRoadmapRecord } from '../types/update-roadmap-record.types';

export const ROADMAP_REPOSITOTY = 'ROADMAP_REPOSITORY';

export interface roadmapRepository {
  create(roadmap: CreateRoadmapRecord, client?: PoolClient): Promise<Roadmap>;
  findAll(): Promise<Roadmap[]>;
  findByTitle(title: string): Promise<Roadmap[]>;
  findById(id: string): Promise<Roadmap | null>;
  update(id: string, roadmap: UpdateRoadmapRecord): Promise<Roadmap>;
  delete(id: string): Promise<boolean>;
}
