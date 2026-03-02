import { Injectable } from '@nestjs/common';
import { courseRoadmapRepository } from './course_roadmap.interface.repository';
import { DatabaseService } from 'src/database/database.service';
import { createCourseRoadmapQuery } from '../query/createCourseRoadmapQuery';
import { deleteCourseRoadmapQuery } from '../query/deleteCourseRoadmapQuery';

@Injectable()
export class courseRoadmapPGRepository implements courseRoadmapRepository {
  constructor(private readonly db: DatabaseService) {}
  async link(courseId: string, roadmapId: string): Promise<void> {
    const { query, values } = createCourseRoadmapQuery(courseId, roadmapId);
    await this.db.runQuery(query, values);
  }

  async unlink(courseId: string, roadmapId: string): Promise<void> {
    const { query, values } = deleteCourseRoadmapQuery(courseId, roadmapId);
    await this.db.runQuery(query, values);
  }
}
