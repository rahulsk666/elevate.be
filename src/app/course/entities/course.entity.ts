import { courseStatus } from '../types/course-status.types';

export class Course {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  createdBy: string;
  thumbnailUrl: string | null;
  status: courseStatus;
  createdAt: Date;
  updatedAt: Date;
}
