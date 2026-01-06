import { Course } from '../entities/course.entity';
import { CreateCourseRecord } from '../types/create-course-record.types';
import { UpdateCourseRecord } from '../types/update-course-record.types';

export const COURSE_REPOSITOTY = 'COURSE_REPOSITORY';

export interface courseRepository {
  create(course: CreateCourseRecord): Promise<Course>;
  findAll(): Promise<Course[]>;
  findByCondition(condition: Record<string, any>): Promise<Course[]>;
  findById(id: string): Promise<Course | null>;
  update(id: string, course: UpdateCourseRecord): Promise<Course>;
  delete(id: string): Promise<boolean>;
}
