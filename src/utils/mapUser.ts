import { User } from 'src/app/user/entities/user.entity';

export function mapUser(row: any): User | null {
  if (!row) return null; // defensive: handle null/undefined

  // convert createdAt/updatedAt if present (leave as-is if already Date or missing)
  const createdAt =
    row.createdAt instanceof Date
      ? row.createdAt
      : row.createdAt
        ? new Date(row.createdAt)
        : undefined;
  const updatedAt =
    row.updatedAt instanceof Date
      ? row.updatedAt
      : row.updatedAt
        ? new Date(row.updatedAt)
        : undefined;

  return {
    ...row,
    // ensure types; if your User entity requires Date non-null, adjust calling code instead
    createdAt,
    updatedAt,
  } as User;
}

export function mapUserArray(rows: any[]): User[] {
  if (!Array.isArray(rows)) return [];
  // map -> (User | null)[] then filter -> User[]
  return rows.map(mapUser).filter((u): u is User => u !== null);
}
