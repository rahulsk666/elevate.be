import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CoursePgRepository } from './repository/course.repository';
import { COURSE_REPOSITORY } from './repository/course.interface.repository';
import { DatabaseModule } from 'src/database/database.module';
import { courseRoadmapPGRepository } from './repository/course_roadmap.repository';
import { COURSE_ROADMAP_REPOSITOTY } from './repository/course_roadmap.interface.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [CourseController],
  providers: [
    CourseService,
    { provide: COURSE_REPOSITORY, useClass: CoursePgRepository },
    { provide: COURSE_ROADMAP_REPOSITOTY, useClass: courseRoadmapPGRepository },
    CoursePgRepository,
  ],
})
export class CourseModule {}
