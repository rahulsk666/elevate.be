import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { IdParamDto } from './dto/find-param.dto';
import { User } from 'src/common/decorators/user.decorator';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @User('id') userId: string) {
    return this.courseService.create(createCourseDto, userId);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param() param: IdParamDto) {
    const condition = { param };
    return this.courseService.findByCondition(condition);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @User('id') userId: string,
  ) {
    return this.courseService.update(id, updateCourseDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User('id') userID: string) {
    return this.courseService.delete(id, userID);
  }
}
