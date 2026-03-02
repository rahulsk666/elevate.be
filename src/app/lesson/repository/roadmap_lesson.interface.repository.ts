import { PoolClient } from 'pg';

export const ROADMAP_LESSON_REPOSITORY = 'ROADMAP_LESSON_REPOSITORY';

export interface roadmapLessonRepository {
  link(roadmapId: string, lessonId: string, client?: PoolClient): Promise<void>;
  unlink(
    roadmapId: string,
    lessonId: string,
    client?: PoolClient,
  ): Promise<void>;
}
