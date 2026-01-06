export function selectAllLessons(): string {
  return `
  SELECT id,
    title,
    description, 
    url,
    lesson_type AS "lessonType",
    created_by AS "createdBy",
    created_at AS "createdAt",
    updated_at AS "updatedAt"
    FROM lessons;
    `;
}

export function selectLessonById(id: string): {
  query: string;
  values: unknown[];
} {
  const query = `
  SELECT id,
    title,
    description, 
    url,
    lesson_type AS "lessonType",
    created_by AS "createdBy",
    created_at AS "createdAt",
    updated_at AS "updatedAt"
    FROM lessons
    WHERE id = $1;
    `;
  const values = [id];
  return { query, values };
}

export function selectLessonByTitle(title: string): {
  query: string;
  values: unknown[];
} {
  const query = `
  SELECT id,
    title,
    description,
    url,
    lesson_type AS "lessonType",
    created_by AS "createdBy",
    created_at AS "createdAt",
    updated_at AS "updatedAt"
    FROM lessons
    WHERE title LIKE $1;
    `;
  const values = [title];
  return { query, values };
}
