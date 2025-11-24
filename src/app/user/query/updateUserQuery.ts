import { UpdateUserDto } from '../dto/update-user.dto';

export function updateUserQuery(
  id: string,
  user: UpdateUserDto,
): {
  query: string;
  values: unknown[];
} {
  const columns: string[] = [];
  const values: unknown[] = [];
  let idx: number = 1;

  if (user.name !== undefined) {
    columns.push(`name = $${idx++}`);
    values.push(user.name);
  }

  if (user.email !== undefined) {
    columns.push(`email = $${idx++}`);
    values.push(user.email);
  }

  if (user.avatarUrl !== undefined) {
    columns.push(`avatar_url = $${idx++}`);
    values.push(user.avatarUrl);
  }

  if (user.bio !== undefined) {
    columns.push(`bio = $${idx++}`);
    values.push(user.bio);
  }

  if (user.hashedRefreshToken !== undefined) {
    columns.push(`refresh_token = $${idx++}`);
    values.push(user.hashedRefreshToken);
  }

  values.push(id);

  const query = `
  UPDATE users
    SET ${columns.join(', ')}
    WHERE id = $${idx}
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
