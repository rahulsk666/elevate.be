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
    WHERE title ILIKE $1;
    `;

  const titleString = title ? `%${title}%` : null;
  const values = [titleString];
  return { query, values };
}

export function selectLessonByRoadmap(roadmap_id: string): {
  query: string;
  values: unknown[];
} {
  const query = `
  SELECT 
    l.id,
    l.title,
    l.description, 
    l.url,
    l.lesson_type AS "lessonType",
    l.created_by AS "createdBy",
    l.created_at AS "createdAt",
    l.updated_at AS "updatedAt"
    FROM roadmap_lesson rl
    INNER JOIN lessons l ON l.id = rl.lesson_id
    WHERE rl.roadmap_id = $1
    ORDER BY rl.lesson_order ASC;
    `;
  const values = [roadmap_id];
  return { query, values };
}
