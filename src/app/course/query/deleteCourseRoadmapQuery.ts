export function deleteCourseRoadmapQuery(
  course_id: string,
  roadmap_id: string,
): {
  query: string;
  values: unknown[];
} {
  const query = `
    DELETE FROM course_roadmap
    WHERE course_id = $1 AND roadmap_id = $2
  `;
  const values = [course_id, roadmap_id];

  return { query, values };
}
