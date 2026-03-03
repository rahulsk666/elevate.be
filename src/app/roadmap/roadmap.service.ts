import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';
import {
  ROADMAP_REPOSITOTY,
  type roadmapRepository,
} from './repository/roadmap.interface.repository';
import {
  COURSE_ROADMAP_REPOSITOTY,
  type courseRoadmapRepository,
} from './repository/course_roadmap.interface.repository';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RoadmapService {
  constructor(
    @Inject(ROADMAP_REPOSITOTY)
    private readonly roadmapRepo: roadmapRepository,
    @Inject(COURSE_ROADMAP_REPOSITOTY)
    private readonly courseRoadmapRepo: courseRoadmapRepository,
    private readonly db: DatabaseService,
  ) {}
  async create(createRoadmapDto: CreateRoadmapDto, userId: string) {
    const { course_id, ...roadmapData } = createRoadmapDto;
    return await this.db.runInTransaction(async (client) => {
      const roadmap = await this.roadmapRepo.create(
        {
          ...roadmapData,
          createdBy: userId,
          roadmapStatus: roadmapData.roadmapStatus ?? 'draft',
        },
        client,
      );
      await this.courseRoadmapRepo.link(course_id, roadmap.id, client);
      return roadmap;
    });
  }

  async findAll() {
    return await this.roadmapRepo.findAll();
  }

  async findById(id: string) {
    const roadmap = await this.roadmapRepo.findById(id);
    if (!roadmap) {
      throw new NotFoundException('Roadmap not found');
    }
    return roadmap;
  }

  async findByCourse(course_id: string) {
    return await this.roadmapRepo.findByCourse(course_id);
  }

  async findByTitle(title: string) {
    return await this.roadmapRepo.findByTitle(title);
  }

  async update(id: string, updateRoadmapDto: UpdateRoadmapDto, userId: string) {
    const roadmap = await this.roadmapRepo.findById(id);
    if (!roadmap) {
      throw new NotFoundException('Roadmap not found');
    }
    if (roadmap.createdBy !== userId) {
      throw new ForbiddenException('You cannot update this roadmap');
    }
    return await this.roadmapRepo.update(id, updateRoadmapDto);
  }

  async delete(id: string, userId: string) {
    const roadmap = await this.roadmapRepo.findById(id);

    if (!roadmap) {
      throw new NotFoundException('Roadmap not found');
    }

    if (roadmap.createdBy !== userId) {
      throw new ForbiddenException('You cannot delete this roadmap');
    }
    const deleted = await this.roadmapRepo.delete(id);

    if (!deleted) {
      throw new InternalServerErrorException('Failed to delete roadmap');
    }
  }
}
