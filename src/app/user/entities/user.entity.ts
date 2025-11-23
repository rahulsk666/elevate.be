import { UUID } from 'crypto';

export class UserEntity {
  id: UUID;
  name: string;
  email: string;
  avatarUrl: string;
  bio: string;
  readonly createdAt: Date;
  updatedAt: Date;
  hashedRefreshToken: string | null;
}
