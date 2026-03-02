export function deleteCourseQuery(id: string): {
  query: string;
  values: unknown[];
} {
  const query = `
  DELETE FROM courses WHERE id = $1
  `;
  const values = [id];
  return { query, values };
}
