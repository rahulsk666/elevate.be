import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdParamDto } from './dto/id-param.dto';
import { User as UserDecorator } from 'src/common/decorators/user.decorator';
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
  async getProfile(@UserDecorator('id') userId: string) {
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
    @UserDecorator('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updateUserDto);
  }
}
