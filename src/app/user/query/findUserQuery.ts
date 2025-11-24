export function selectAllUsersQuery(): string {
  return `SELECT id, name, email, avatar_url, bio FROM users`;
}

export function selectUserByConditionQuery(
  paramName: string,
  param: string,
): {
  query: string;
  values: unknown[];
} {
  const values: unknown[] = [];
  const query = `SELECT id, name, email, avatar_url, bio FROM users WHERE $1=$2`;
  values.push(paramName);
  values.push(param);
  return { query, values };
}
