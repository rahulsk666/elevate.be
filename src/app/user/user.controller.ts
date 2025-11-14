import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import type { RequestWithUser } from 'src/types/user.types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get()
  async getAllUser() {
    return this.userService.findAll();
  }

  @Get('profile')
  async getProfile(@Req() req: RequestWithUser) {
    const userId = req.user?.id;
    if (!userId) throw new BadRequestException('User id missing in token');
    return this.userService.findOne(userId);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }
}
