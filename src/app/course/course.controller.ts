import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
// import { FindParamDto } from './dto/find-param.dto';
import { User } from 'src/common/decorators/user.decorator';
import { IdParamDto } from './dto/id-param.dto';
import { FindCourseTitleDto } from './dto/find-course-title.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto, @User('id') userId: string) {
    return this.courseService.create(createCourseDto, userId);
  }

  @Get('search')
  findByTitle(@Query() query: FindCourseTitleDto) {
    return this.courseService.findByTitle(query.title);
  }

  // @Get()
  // findByCondition(@Query() condition: FindParamDto) {
  //   return this.courseService.findByCondition(condition);
  // }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param() param: IdParamDto) {
    return this.courseService.findById(param.id);
  }

  @Patch(':id')
  update(
    @Param() param: IdParamDto,
    @Body() updateCourseDto: UpdateCourseDto,
    @User('id') userId: string,
  ) {
    return this.courseService.update(param.id, updateCourseDto, userId);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param() param: IdParamDto, @User('id') userId: string) {
    return this.courseService.delete(param.id, userId);
  }
}
