import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { roadmapPgRepository } from './repository/roadmap.repository';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';

@Injectable()
export class RoadmapService {
  constructor(@Inject() private readonly roadmapRepo: roadmapPgRepository) {}
  async create(createRoadmapDto: CreateRoadmapDto, userId: string) {
    return await this.roadmapRepo.create({
      ...createRoadmapDto,
      createdBy: userId,
      roadmapStatus: createRoadmapDto.roadmapStatus ?? 'draft',
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
