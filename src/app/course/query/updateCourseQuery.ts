import { UpdateCourseDto } from '../dto/update-course.dto';

export function updateCourseQuery(
  id: string,
  course: UpdateCourseDto,
): {
  query: string;
  values: unknown[];
} {
  const columns: string[] = [];
  const values: unknown[] = [];
  let idx: number = 1;

  if (course.title !== undefined) {
    columns.push(`title = $${idx++}`);
    values.push(course.title);
  }

  if (course.subtitle !== undefined) {
    columns.push(`subtitle = $${idx++}`);
    values.push(course.subtitle);
  }

  if (course.thumbnailUrl !== undefined) {
    columns.push(`thumbnail_url = $${idx++}`);
    values.push(course.thumbnailUrl);
  }

  if (course.description !== undefined) {
    columns.push(`description = $${idx++}`);
    values.push(course.description);
  }

  if (course.status !== undefined) {
    columns.push(`status = $${idx++}`);
    values.push(course.status);
  }

  columns.push(`updated_at = NOW()`);

  values.push(id);

  const query = `
  UPDATE courses
    SET ${columns.join(', ')}
    WHERE id = $${idx}
    RETURNING id,
      title,
      subtitle,
      thumbnail_url as "thumbnailUrl",
      description,
      status,
      created_at AS "createdAt",
      updated_at AS "updatedAt"
`;

  return { query, values };
}
