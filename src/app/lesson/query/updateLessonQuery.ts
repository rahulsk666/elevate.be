import { UpdateLessonRecord } from '../types/update-lesson-record.ts';

export function updateLessonQuery(
  id: string,
  lesson: UpdateLessonRecord,
): {
  query: string;
  values: unknown[];
} {
  const columns: string[] = [];
  const values: unknown[] = [];
  let idx: number = 1;

  if (lesson.title !== undefined) {
    columns.push(`title = $${idx++}`);
    values.push(lesson.title);
  }

  if (lesson.url !== undefined) {
    columns.push(`url = $${idx++}`);
    values.push(lesson.url);
  }

  if (lesson.description !== undefined) {
    columns.push(`description = $${idx++}`);
    values.push(lesson.description);
  }

  if (lesson.lessonType !== undefined) {
    columns.push(`lesson_type = $${idx++}`);
    values.push(lesson.lessonType);
  }

  columns.push(`updated_at = NOW()`);

  values.push(id);

  const query = `
  UPDATE lessons
    SET ${columns.join(', ')}
    WHERE id = $${idx}
    RETURNING id,
      title,
      description,
      url,
      lesson_type AS "lessonType",
      created_at AS "createdAt",
      updated_at AS "updatedAt"
`;

  return { query, values };
}
