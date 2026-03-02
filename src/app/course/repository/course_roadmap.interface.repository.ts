export const COURSE_ROADMAP_REPOSITOTY = 'COURSE_ROADMAP_REPOSITORY';

export interface courseRoadmapRepository {
  link(courseId: string, roadmapId: string): Promise<void>;
  unlink(courseId: string, roadmap: string): Promise<void>;
}
