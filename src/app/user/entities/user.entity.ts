export class UserEntity {
  name: string;
  email: string;
  avatarUrl: string;
  bio: string;
  readonly createdAt: Date;
  updatedAt: Date;
}
