import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { User } from 'src/common/decorators/user.decorator';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { FindLessonIdDto } from './dto/find-lesson-id.dto';
import { FindLessonTitleDto } from './dto/find-lesson-title.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('lesson')
export class LessonController {
  constructor(@Inject() private readonly lessonService: LessonService) {}
  @Post()
  create(@Body() createLessonDto: CreateLessonDto, @User('id') userId: string) {
    return this.lessonService.create(createLessonDto, userId);
  }

  @Get('search')
  findByTitle(@Query() query: FindLessonTitleDto) {
    return this.lessonService.findByTitle(query.title);
  }

  @Get()
  findAll() {
    return this.lessonService.findAll();
  }

  @Get(':id')
  findOne(@Param() param: FindLessonIdDto) {
    return this.lessonService.findById(param.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLessonDto: UpdateLessonDto,
    @User('id') userId: string,
  ) {
    return this.lessonService.update(id, updateLessonDto, userId);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string, @User('id') userId: string): Promise<void> {
    Logger.log(id, 'Delete id');
    return this.lessonService.delete(id, userId);
  }
}
