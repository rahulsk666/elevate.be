import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CoursePgRepository } from './repository/course.repository';
import { COURSE_REPOSITOTY } from './repository/course.interface.repository';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CourseController],
  providers: [
    CourseService,
    { provide: COURSE_REPOSITOTY, useClass: CoursePgRepository },
    CoursePgRepository,
  ],
})
export class CourseModule {}
