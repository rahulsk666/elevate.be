import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import type { RequestWithUser } from 'src/types/user.types';
import { User } from './entities/user.entity';
import { IdParamDto } from './dto/id-param.dto';

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
  async getUser(@Param() params: IdParamDto) {
    const user = await this.userService.findById(params.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
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
