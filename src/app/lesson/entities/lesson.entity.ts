import { lessonType } from '../types/lesson-type.types';

export class Lesson {
  id: string;
  title: string;
  url: string;
  description: string;
  lesson_type: lessonType;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
