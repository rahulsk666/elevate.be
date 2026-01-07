import { Injectable } from '@nestjs/common';
import { courseRepository } from './course.interface.repository';
import { DatabaseService } from 'src/database/database.service';
import { Course } from '../entities/course.entity';
import { CreateCourseRecord } from '../types/create-course-record.types';
import { createCourseQuery } from '../query/createCourseQuery';
import {
  selectCourseByConditionQuery,
  selectCourseByIdQuery,
  selectCourseByTitleQuery,
} from '../query/findCourseQuery';
import { updateCourseQuery } from '../query/updateCourseQuery';
import { deleteCouseQuery } from '../query/deleteCourseQuery';
import { UpdateCourseRecord } from '../types/update-course-record.types';

@Injectable()
export class CoursePgRepository implements courseRepository {
  constructor(private readonly db: DatabaseService) {}
  async create(course: CreateCourseRecord): Promise<Course> {
    const { query, values } = createCourseQuery(course);
    const result = await this.db.runQuery(query, values);
    return result.rows[0] as Course;
  }

  async findAll(): Promise<Course[]> {
    const { query } = selectCourseByConditionQuery();
    const result = await this.db.runQuery(query);
    return result.rows as Course[];
  }

  async findByCondition(condition: Record<string, any>): Promise<Course[]> {
    const { query, values } = selectCourseByConditionQuery(condition);
    const result = await this.db.runQuery(query, values);
    return result.rows as Course[];
  }

  async findByTitle(title: string): Promise<Course[]> {
    const { query, values } = selectCourseByTitleQuery(title);
    const result = await this.db.runQuery(query, values);
    return result.rows as Course[];
  }

  async findById(id: string): Promise<Course | null> {
    const query = selectCourseByIdQuery(id);
    const result = await this.db.runQuery(query);
    return result.rows[0] as Course;
  }

  async update(id: string, course: UpdateCourseRecord): Promise<Course> {
    const { query, values } = updateCourseQuery(id, course);
    const result = await this.db.runQuery(query, values);
    return result.rows[0] as Course;
  }

  async delete(id: string): Promise<boolean> {
    const { query, values } = deleteCouseQuery(id);
    const result = await this.db.runQuery(query, values);
    return result.rowCount === 1;
  }
}
