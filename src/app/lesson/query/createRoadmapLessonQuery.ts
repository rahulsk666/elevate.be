export function createRoadmapLessonQuery(
  roadmap_id: string,
  lesson_id: string,
): {
  query: string;
  values: unknown[];
} {
  const query = `
    INSERT INTO roadmap_lesson (roadmap_id, lesson_id, lesson_order)
    VALUES (
      $1,
      $2,
      (SELECT COALESCE(MAX(lesson_order), 0) + 1 FROM roadmap_lesson WHERE roadmap_id = $3)
    )
    ON CONFLICT DO NOTHING
  `;

  return { query, values: [roadmap_id, lesson_id, roadmap_id] };
}
