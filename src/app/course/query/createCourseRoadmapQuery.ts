export function createCourseRoadmapQuery(
  course_id: string,
  roadmap_id: string,
): {
  query: string;
  values: unknown[];
} {
  const query = `
    INSERT INTO course_roadmap (course_id, roadmap_id, roadmap_order)
    VALUES (
      $1,
      $2,
      (SELECT COALESCE(MAX(roadmap_order), 0) + 1 FROM course_roadmap WHERE roadmap_id = $3)
    )
    ON CONFLICT DO NOTHING
  `;

  return { query, values: [course_id, roadmap_id, roadmap_id] };
}
