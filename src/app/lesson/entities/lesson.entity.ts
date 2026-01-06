import { lessonType } from '../types/lesson-type.types';

export class Lesson {
  id: string;
  title: string;
  url: string;
  description: string;
  lessonType: lessonType;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
