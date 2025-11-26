import { CreateUserDto } from '../dto/create-user.dto';

export function createUserQuery(user: CreateUserDto): {
  query: string;
  values: unknown[];
} {
  const columns: string[] = [];
  const placeholders: string[] = [];
  const values: unknown[] = [];
  let idx: number = 1;

  if (user.name !== undefined) {
    columns.push(`name`);
    placeholders.push(`$${idx++}`);
    values.push(user.name);
  }

  if (user.email !== undefined) {
    columns.push(`email`);
    placeholders.push(`$${idx++}`);
    values.push(user.email);
  }

  if (user.avatarUrl !== undefined) {
    columns.push(`avatar_url`);
    placeholders.push(`$${idx++}`);
    values.push(user.avatarUrl);
  }

  if (user.bio !== undefined) {
    columns.push(`bio`);
    placeholders.push(`$${idx++}`);
    values.push(user.bio);
  }

  if (user.hashedRefreshToken !== undefined) {
    columns.push(`refresh_token`);
    placeholders.push(`$${idx++}`);
    values.push(user.hashedRefreshToken);
  }

  const query = `
  INSERT INTO users(${columns.join(', ')}) 
  VALUES (${placeholders.join(', ')}) 
  ON CONFLICT (email) 
  DO UPDATE SET
  refresh_token = EXCLUDED.refresh_token
  RETURNING id,
    name, 
    email, 
    avatar_url, 
    bio,
    created_at AS "createdAt",
    updated_at AS "updatedAt"
  `;

  return { query, values };
}
