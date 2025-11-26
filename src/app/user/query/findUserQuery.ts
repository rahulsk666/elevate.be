export function selectAllUsersQuery(): string {
  return `SELECT 
    id, 
    name, 
    email, 
    avatar_url, 
    bio,
    created_at AS "createdAt",
    updated_at AS "updatedAt"
    FROM users`;
}

export function selectUserByConditionQuery(
  paramName: string,
  param: string,
): {
  query: string;
  values: unknown[];
} {
  const values: unknown[] = [];
  const query = `
    SELECT 
    id, 
    name, 
    email, 
    avatar_url, 
    bio,
    refresh_token AS "hashedRefreshToken",
    created_at AS "createdAt",
    updated_at AS "updatedAt" 
    FROM users 
    WHERE ${paramName}=$1`;
  values.push(param);
  return { query, values };
}
