import { CreateLessonDto } from '../dto/create-lesson.dto';
import { UpdateLessonDto } from '../dto/update-lesson.dto';
import { Lesson } from '../entities/lesson.entity';

export const LESSON_REPOSITOTY = 'LESSON_REPOSITORY';

export interface lessonRepository {
  create(lesson: CreateLessonDto): Promise<Lesson>;
  findAll(): Promise<Lesson[]>;
  findByCondition(condition: Record<string, any>): Promise<Lesson[]>;
  findById(id: string): Promise<Lesson | null>;
  update(id: string, lesson: UpdateLessonDto): Promise<Lesson>;
  delete(id: string): Promise<void>;
}
