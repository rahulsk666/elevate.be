import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LessonController } from './lesson.controller';
import { LessonService } from './lesson.service';
import { lessonPgRepository } from './repository/lesson.repository';
import { LESSON_REPOSITOTY } from './repository/lesson.interface.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [LessonController],
  providers: [
    LessonService,
    { provide: LESSON_REPOSITOTY, useClass: lessonPgRepository },
    lessonPgRepository,
  ],
})
export class LessonModule {}
