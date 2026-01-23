import { Injectable } from '@nestjs/common';
import { lessonRepository } from './lesson.interface.repository';
import { Lesson } from '../entities/lesson.entity';
import { createLessonQuery } from '../query/createLessonQuery';
import { CreateLessonRecord } from '../types/create-lessson-record.types';
import { DatabaseService } from 'src/database/database.service';
import {
  selectAllLessons,
  selectLessonById,
  selectLessonByTitle,
} from '../query/findLessonQuery';
import { UpdateLessonRecord } from '../types/update-lesson-record.ts';
import { deleteLessonQuery } from '../query/deleteLessonQuery';
import { updateLessonQuery } from '../query/updateLessonQuery';

@Injectable()
export class lessonPgRepository implements lessonRepository {
  constructor(private readonly db: DatabaseService) {}
  async create(lesson: CreateLessonRecord): Promise<Lesson> {
    const { query, values } = createLessonQuery(lesson);
    const result = await this.db.runQuery(query, values);
    return result.rows[0] as Lesson;
  }
  async findAll(): Promise<Lesson[]> {
    const query = selectAllLessons();
    const result = await this.db.runQuery(query);
    return result.rows as Lesson[];
  }
  async findByTitle(title: string): Promise<Lesson[]> {
    const { query, values } = selectLessonByTitle(title);
    const result = await this.db.runQuery(query, values);
    return result.rows as Lesson[];
  }
  async findById(id: string): Promise<Lesson | null> {
    const { query, values } = selectLessonById(id);
    const result = await this.db.runQuery(query, values);
    return result.rows[0] as Lesson;
  }
  async update(id: string, lesson: UpdateLessonRecord): Promise<Lesson> {
    const { query, values } = updateLessonQuery(id, lesson);
    const result = await this.db.runQuery(query, values);
    return result.rows[0] as Lesson;
  }
  async delete(id: string): Promise<boolean> {
    const { query, values } = deleteLessonQuery(id);
    const result = await this.db.runQuery(query, values);
    return result.rowCount === 1;
  }
}
