import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPgRepository } from './repository/user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserPgRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepo.create(createUserDto);
    return user;
  }

  async findAll(): Promise<User[]> {
    const user: User[] = await this.userRepo.findAll();
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepo.findById(id);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepo.findByEmail(email);
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.update(id, updateUserDto);
    return user;
  }

  async updateHashedRefreshToken(
    id: string,
    hashedRefreshToken: string | null,
  ): Promise<void> {
    return await this.userRepo.updateHashedRefreshToken(id, hashedRefreshToken);
  }
}
