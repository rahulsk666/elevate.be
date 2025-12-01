import { Inject, Injectable } from '@nestjs/common';
import { courseRepository } from './course.interface.repository';
import { DatabaseService } from 'src/database/database.service';
import { Course } from '../entities/course.entity';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { CreateCourseRecord } from '../types/create-course-record.types';
import { createCourseQuery } from '../query/createCourseQuery';
import { plainToInstance } from 'class-transformer';
import {
  selectCourseByConditionQuery,
  selectCourseByIdQuery,
} from '../query/findCourseQuery';
import { updateCourseQuery } from '../query/updateCourseQuery';
import { deleteCouseQuery } from '../query/deleteCourseQuery';

@Injectable()
export class CoursePgRepository implements courseRepository {
  constructor(@Inject() private readonly db: DatabaseService) {}
  async create(course: CreateCourseRecord): Promise<Course> {
    const { query, values } = createCourseQuery(course);
    const result = await this.db.runQuery(query, values);
    return plainToInstance(Course, result.rows[0]);
  }

  async findAll(): Promise<Course[]> {
    const { query } = selectCourseByConditionQuery();
    const result = await this.db.runQuery(query);
    return plainToInstance(Course, result.rows);
  }

  async findByCondition(condition: Record<string, any>): Promise<Course[]> {
    const { query, values } = selectCourseByConditionQuery(condition);
    const result = await this.db.runQuery(query, values);
    return plainToInstance(Course, result.rows);
  }

  async findById(id: string): Promise<Course | null> {
    const query = selectCourseByIdQuery(id);
    const result = await this.db.runQuery(query);
    if (!result.rows[0]) return null;
    return plainToInstance(Course, result.rows[0]);
  }

  async update(id: string, course: UpdateCourseDto): Promise<Course> {
    const { query, values } = updateCourseQuery(id, course);
    const result = await this.db.runQuery(query, values);
    return plainToInstance(Course, result.rows[0]);
  }

  async delete(id: string): Promise<void> {
    const { query, values } = deleteCouseQuery(id);
    await this.db.runQuery(query, values);
  }
}
