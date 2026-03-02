import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { lessonPgRepository } from './repository/lesson.repository';
import { LESSON_REPOSITORY } from './repository/lesson.interface.repository';
import { ROADMAP_LESSON_REPOSITORY } from './repository/roadmap_lesson.interface.repository';
import { roadmapLessonPGRepository } from './repository/roadmap_lesson.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [LessonController],
  providers: [
    LessonService,
    { provide: LESSON_REPOSITORY, useClass: lessonPgRepository },
    { provide: ROADMAP_LESSON_REPOSITORY, useClass: roadmapLessonPGRepository },
  ],
})
export class LessonModule {}
