import { lessonType } from './lesson-type.types';

export interface CreateLessonRecord {
  title: string;
  url: string;
  description?: string;
  lessonType?: lessonType;
  createdBy: string;
}
