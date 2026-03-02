import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CoursePgRepository } from './repository/course.repository';
import { COURSE_REPOSITORY } from './repository/course.interface.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CourseController],
  providers: [
    CourseService,
    { provide: COURSE_REPOSITORY, useClass: CoursePgRepository },
  ],
})
export class CourseModule {}
