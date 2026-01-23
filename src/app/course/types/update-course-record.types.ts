import { courseStatus } from './course-status.types';

export interface UpdateCourseRecord {
  title?: string;
  subtitle?: string;
  description?: string;
  thumbnailUrl?: string;
  status?: courseStatus;
}
