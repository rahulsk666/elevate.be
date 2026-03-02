import { courseStatus } from './course-status.types';

export interface CreateCourseRecord {
  title: string;
  subtitle?: string;
  description?: string;
  thumbnailUrl?: string;
  status?: courseStatus;
  createdBy: string;
}
