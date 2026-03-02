import { DatabaseService } from 'src/database/database.service';
import { roadmapLessonRepository } from './roadmap_lesson.interface.repository';
import { createRoadmapLessonQuery } from '../query/createRoadmapLessonQuery';
import { deleteRoadmapLessonQuery } from '../query/deleteRoadmapLessonQuery';
import { Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';

@Injectable()
export class roadmapLessonPGRepository implements roadmapLessonRepository {
  constructor(private readonly db: DatabaseService) {}
  async link(
    roadmapId: string,
    lessonId: string,
    client: PoolClient,
  ): Promise<void> {
    const { query, values } = createRoadmapLessonQuery(roadmapId, lessonId);
    await this.db.runQuery(query, values, client);
  }

  async unlink(
    roadmapId: string,
    lessonId: string,
    client: PoolClient,
  ): Promise<void> {
    const { query, values } = deleteRoadmapLessonQuery(roadmapId, lessonId);
    await this.db.runQuery(query, values, client);
  }
}
