import { PoolClient } from 'pg';

export const COURSE_ROADMAP_REPOSITOTY = 'COURSE_ROADMAP_REPOSITORY';

export interface courseRoadmapRepository {
  link(courseId: string, roadmapId: string, client?: PoolClient): Promise<void>;
  unlink(courseId: string, roadmap: string, client?: PoolClient): Promise<void>;
}
