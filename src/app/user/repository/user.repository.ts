import { DatabaseService } from 'src/database/database.service';
import { UserRepository } from './user.interface.repository';
import { User } from '../entities/user.entity';
import { createUserQuery } from '../query/createUserQuery';
import { CreateUserDto } from '../dto/create-user.dto';
import { plainToInstance } from 'class-transformer';
import {
  selectAllUsersQuery,
  selectUserByConditionQuery,
} from '../query/findUserQuery';
import { updateUserQuery } from '../query/updateUserQuery';
import { UpdateUserDto } from '../dto/update-user.dto';
import { QueryResult } from 'pg';
import { UserRow } from 'src/types/user.types';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserPgRepository implements UserRepository {
  constructor(private readonly db: DatabaseService) {}

  async create(user: CreateUserDto): Promise<User> {
    const { query, values } = createUserQuery(user);
    const result = await this.db.runQuery(query, values);
    return plainToInstance(User, result.rows[0]);
  }

  async findAll(): Promise<User[]> {
    const query = selectAllUsersQuery();
    const result = await this.db.runQuery(query);
    return plainToInstance(User, result.rows);
  }

  async findById(id: string): Promise<User | null> {
    const { query, values } = selectUserByConditionQuery('id', id);
    const result: QueryResult<UserRow> = await this.db.runQuery(query, values);
    const row = result.rows[0];
    if (!row) return null;
    return plainToInstance(User, result.rows[0]);
  }

  async findByEmail(email: string): Promise<User | null> {
    const { query, values } = selectUserByConditionQuery('email', email);
    const result: QueryResult<UserRow> = await this.db.runQuery(query, values);
    const row = result.rows[0];
    if (!row) return null;
    return plainToInstance(User, result.rows[0]);
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    const { query, values } = updateUserQuery(id, user);
    const result = await this.db.runQuery(query, values);
    return plainToInstance(User, result.rows[0]);
  }

  async updateHashedRefreshToken(
    userId: string,
    hashedRefreshToken: string | null,
  ): Promise<User> {
    const dto: UpdateUserDto = { hashedRefreshToken };
    const { query, values } = updateUserQuery(userId, dto);
    const result = await this.db.runQuery(query, values);
    return  result.rows[0] as User;
  }
}
