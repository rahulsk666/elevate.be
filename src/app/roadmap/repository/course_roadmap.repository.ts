import { Injectable } from '@nestjs/common';
import { courseRoadmapRepository } from './course_roadmap.interface.repository';
import { DatabaseService } from 'src/database/database.service';
import { createCourseRoadmapQuery } from '../query/createCourseRoadmapQuery';
import { deleteCourseRoadmapQuery } from '../query/deleteCourseRoadmapQuery';
import { PoolClient } from 'pg';

@Injectable()
export class courseRoadmapPGRepository implements courseRoadmapRepository {
  constructor(private readonly db: DatabaseService) {}
  async link(
    courseId: string,
    roadmapId: string,
    client: PoolClient,
  ): Promise<void> {
    const { query, values } = createCourseRoadmapQuery(courseId, roadmapId);
    await this.db.runQuery(query, values, client);
  }

  async unlink(
    courseId: string,
    roadmapId: string,
    client: PoolClient,
  ): Promise<void> {
    const { query, values } = deleteCourseRoadmapQuery(courseId, roadmapId);
    await this.db.runQuery(query, values, client);
  }
}
