import { CreateLessonRecord } from '../types/create-lessson-record.types';

export function createLessonQuery(lesson: CreateLessonRecord): {
  query: string;
  values: unknown[];
} {
  const columns: string[] = [];
  const placeholders: string[] = [];
  const values: unknown[] = [];
  let idx: number = 1;

  if (lesson.title !== undefined) {
    columns.push(`title`);
    placeholders.push(`$${idx++}`);
    values.push(lesson.title);
  }

  if (lesson.url !== undefined) {
    columns.push(`url`);
    placeholders.push(`$${idx++}`);
    values.push(lesson.url);
  }

  if (lesson.description !== undefined) {
    columns.push(`description`);
    placeholders.push(`$${idx++}`);
    values.push(lesson.description);
  }

  if (lesson.createdBy !== undefined) {
    columns.push(`created_by`);
    placeholders.push(`$${idx++}`);
    values.push(lesson.createdBy);
  }

  if (lesson.lessonType !== undefined) {
    columns.push(`lesson_type`);
    placeholders.push(`$${idx++}`);
    values.push(lesson.lessonType);
  }

  const query = `
  INSERT INTO lessons(${columns.join(', ')}) 
  VALUES (${placeholders.join(', ')})
  RETURNING id,
    title,
    url,
    description, 
    lesson_type AS "lessonType",
    created_by,
    created_at AS "createdAt",
    updated_at AS "updatedAt"
  `;

  return { query, values };
}
