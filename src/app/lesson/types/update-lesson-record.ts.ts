import { lessonType } from './lesson-type.types';

export interface UpdateLessonRecord {
  title?: string;
  url?: string;
  description?: string;
  lessonType?: lessonType;
}
