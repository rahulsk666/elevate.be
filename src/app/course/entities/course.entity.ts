import { courseStatus } from '../types/course-status.types';

export class Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  createdBy: string;
  thumbnailUrl: string;
  status: courseStatus;
  createdAt: Date;
  updatedAt: Date;
}
