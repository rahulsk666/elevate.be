export function deleteRoadmapQuery(id: string): {
  query: string;
  values: unknown[];
} {
  const query = `
  DELETE FROM roadmaps WHERE id = $1
  `;
  const values = [id];
  return { query, values };
}
