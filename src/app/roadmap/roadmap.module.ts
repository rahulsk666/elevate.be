import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RoadmapController } from './roadmap.controller';
import { RoadmapService } from './roadmap.service';
import { ROADMAP_REPOSITOTY } from './repository/roadmap.interface.repository';
import { roadmapPgRepository } from './repository/roadmap.repository';
import { COURSE_ROADMAP_REPOSITOTY } from './repository/course_roadmap.interface.repository';
import { courseRoadmapPGRepository } from './repository/course_roadmap.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [RoadmapController],
  providers: [
    RoadmapService,
    { provide: ROADMAP_REPOSITOTY, useClass: roadmapPgRepository },
    { provide: COURSE_ROADMAP_REPOSITOTY, useClass: courseRoadmapPGRepository },
  ],
})
export class RoadmapModule {}
