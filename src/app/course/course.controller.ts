import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Inject,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FindParamDto } from './dto/find-param.dto';
import { User } from 'src/common/decorators/user.decorator';
import { IdParamDto } from './dto/id-param.dto';

@Controller('course')
export class CourseController {
  constructor(@Inject() private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @User('id') userId: string) {
    return this.courseService.create(createCourseDto, userId);
  }

  @Get(':id')
  findOne(@Param() param: IdParamDto) {
    return this.courseService.findById(param.id);
  }

  @Get()
  findByCondition(@Query() condition: FindParamDto) {
    return this.courseService.findByCondition(condition);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
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
