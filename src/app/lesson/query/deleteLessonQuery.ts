export function deleteLessonQuery(id: string): {
  query: string;
  values: unknown[];
} {
  const query = `
  DELETE FROM lesson WHERE id = $1
  `;
  const values = [id];
  return { query, values };
}
