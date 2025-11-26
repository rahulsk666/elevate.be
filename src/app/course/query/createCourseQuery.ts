import { CreateCourseRecord } from '../types/create-course-record.types';

export function createCourseQuery(course: CreateCourseRecord): {
  query: string;
  values: unknown[];
} {
  const columns: string[] = [];
  const placeholders: string[] = [];
  const values: unknown[] = [];
  let idx: number = 1;

  if (course.title !== undefined) {
    columns.push(`title`);
    placeholders.push(`$${idx++}`);
    values.push(course.title);
  }

  if (course.subtitle !== undefined) {
    columns.push(`subtitle`);
    placeholders.push(`$${idx++}`);
    values.push(course.subtitle);
  }

  if (course.description !== undefined) {
    columns.push(`description`);
    placeholders.push(`$${idx++}`);
    values.push(course.description);
  }

  if (course.createdBy !== undefined) {
    columns.push(`created_by`);
    placeholders.push(`$${idx++}`);
    values.push(course.createdBy);
  }

  if (course.thumbnailUrl !== undefined) {
    columns.push(`thumbnail_url`);
    placeholders.push(`$${idx++}`);
    values.push(course.thumbnailUrl);
  }

  if (course.status !== undefined) {
    columns.push(`status`);
    placeholders.push(`$${idx++}`);
    values.push(course.status);
  }

  const query = `
  INSERT INTO courses(${columns.join(', ')}) 
  VALUES (${placeholders.join(', ')})
  RETURNING id,
    title, 
    subtitle, 
    description, 
    thumbnail_url AS "thumbnailUrl",
    status,
    created_by,
    created_at AS "createdAt",
    updated_at AS "updatedAt"
  `;

  return { query, values };
}
