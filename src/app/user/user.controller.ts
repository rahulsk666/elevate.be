import { Body, Controller, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import type { RequestWithUser } from 'src/types/user.types';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(createUserDto);
    return user;
  }

  @Get('profile')
  async getProfile(@Req() req: RequestWithUser) {
    const userId = req.user?.id;
    return this.userService.findById(userId);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Get()
  async getAllUser() {
    return this.userService.findAll();
  }

  @Patch()
  async updateUser(
    @Req() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = req.user.id;
    return this.userService.updateUser(userId, updateUserDto);
  }
}
