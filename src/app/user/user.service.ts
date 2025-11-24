import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPgRepository } from './repository/user.repository';
import { User } from './entities/user.entity';
import { mapUser, mapUserArray } from 'src/utils/mapUser';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserPgRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepo.create(createUserDto);
    return mapUser(user);
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userRepo.findAll();
    return mapUserArray(users);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundException(`User not found with ${id}`);
    return mapUser(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepo.findByEmail(email);
    return mapUser(user);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.update(id, updateUserDto);
    return mapUser(user);
  }

  async updateHashedRefreshToken(
    id: string,
    hashedRefreshToken: string | null,
  ): Promise<void> {
    return await this.userRepo.updateHashedRefreshToken(id, hashedRefreshToken);
  }
}
