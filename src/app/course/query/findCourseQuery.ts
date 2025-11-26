export function selectCourseByConditionQuery(
  condition: Record<string, any> = {},
): {
  query: string;
  values: unknown[];
} {
  const keys = Object.keys(condition);

  // No condition provided -> return all
  if (keys.length === 0) {
    const query = `
    SELECT id,
    title,
    subtitle,
    description, 
    status,
    created_by AS "createdBy",
    thumbnail_url AS "thumbnailUrl",
    created_at AS "createdAt",
    updated_at AS "updatedAt"
    FROM courses
    `;
    return { query, values: [] };
  }

  const whereClauses = keys.map((key, index) => `${key} = $${index + 1}`);
  const values = Object.values(condition);

  const query = `
    SELECT id,
    title,
    subtitle,
    description, 
    status,
    created_by AS "createdBy",
    thumbnail_url AS "thumbnailUrl",
    created_at AS "createdAt",
    updated_at AS "updatedAt"
    FROM courses
    WHERE ${whereClauses.join(' AND ')};
  `;
  return { query, values };
}
