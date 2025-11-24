import { User } from 'src/app/user/entities/user.entity';

export function mapUser(row: any): User {
  return {
    ...row,
    createdAt: new Date(row.createdAt),
    updatedAt: new Date(row.updatedAt),
  };
}

export function mapUserArray(rows: any[]): User[] {
  return rows.map(mapUser);
}
