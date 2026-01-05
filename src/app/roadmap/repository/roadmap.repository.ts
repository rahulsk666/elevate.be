import { Inject, Injectable } from '@nestjs/common';
import { roadmapRepository } from './roadmap.interface.repository';
import { Roadmap } from '../entities/roadmap.entity';
import { createRoadmapQuery } from '../query/createRoadmapQuery';
import { DatabaseService } from 'src/database/database.service';
import { CreateRoadmapRecord } from '../types/create-roadmap-record.types';
import {
  selectAllRoadmap,
  selectRoadmapById,
  selectRoadmapByTitle,
} from '../query/findRoadmapQuery';
import { updateRoadmapQuery } from '../query/updateRoadmapQuery';
import { UpdateRoadmapRecord } from '../types/update-roadmap-record.types';
import { deleteRoadmapQuery } from '../query/deleteRoadmapQuery';

@Injectable()
export class roadmapPgRepository implements roadmapRepository {
  constructor(@Inject() private readonly db: DatabaseService) {}
  async create(roadmap: CreateRoadmapRecord): Promise<Roadmap> {
    const { query, values } = createRoadmapQuery(roadmap);
    const result = await this.db.runQuery(query, values);
    return result.rows[0] as Roadmap;
  }

  async findAll(): Promise<Roadmap[]> {
    const query = selectAllRoadmap();
    const result = await this.db.runQuery(query);
    return result.rows as Roadmap[];
  }

  async findByTitle(title: string): Promise<Roadmap[] | null> {
    const { query, values } = selectRoadmapByTitle(title);
    const result = await this.db.runQuery(query, values);
    return result.rows as Roadmap[];
  }

  async findById(id: string): Promise<Roadmap | null> {
    const { query, values } = selectRoadmapById(id);
    const result = await this.db.runQuery(query, values);
    return result.rows[0] as Roadmap;
  }

  async update(id: string, roadmap: UpdateRoadmapRecord): Promise<Roadmap> {
    const { query, values } = updateRoadmapQuery(id, roadmap);
    const result = await this.db.runQuery(query, values);
    return result.rows[0] as Roadmap;
  }

  async delete(id: string): Promise<boolean> {
    const { query, values } = deleteRoadmapQuery(id);
    const result = await this.db.runQuery(query, values);
    return result.rowCount === 1;
  }
}
