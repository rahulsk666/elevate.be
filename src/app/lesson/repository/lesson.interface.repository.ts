import { Lesson } from '../entities/lesson.entity';
import { CreateLessonRecord } from '../types/create-lessson-record.types';
import { UpdateLessonRecord } from '../types/update-lesson-record.ts';

export const LESSON_REPOSITOTY = 'LESSON_REPOSITORY';

export interface lessonRepository {
  create(lesson: CreateLessonRecord): Promise<Lesson>;
  findAll(): Promise<Lesson[]>;
  findByTitle(title: string): Promise<Lesson[]>;
  findById(id: string): Promise<Lesson | null>;
  update(id: string, lesson: UpdateLessonRecord): Promise<Lesson>;
  delete(id: string): Promise<boolean>;
}
