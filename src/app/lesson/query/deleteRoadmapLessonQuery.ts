export function deleteRoadmapLessonQuery(
  roadmap_id: string,
  lesson_id: string,
): {
  query: string;
  values: unknown[];
} {
  const query = `
    DELETE FROM roadmap_lesson
    WHERE roadmap_id = $1 AND lesson_id = $2
  `;
  const values = [roadmap_id, lesson_id];

  return { query, values };
}
