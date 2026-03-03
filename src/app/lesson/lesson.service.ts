import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import {
  LESSON_REPOSITORY,
  type lessonRepository,
} from './repository/lesson.interface.repository';
import {
  ROADMAP_LESSON_REPOSITORY,
  type roadmapLessonRepository,
} from './repository/roadmap_lesson.interface.repository';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LessonService {
  constructor(
    @Inject(LESSON_REPOSITORY) private readonly lessonRepo: lessonRepository,
    @Inject(ROADMAP_LESSON_REPOSITORY)
    private readonly roadmaplessonRepo: roadmapLessonRepository,
    private readonly db: DatabaseService,
  ) {}
  async create(createLessonDto: CreateLessonDto, userId: string) {
    const { roadmap_id, ...createLessonData } = createLessonDto;
    return await this.db.runInTransaction(async (client) => {
      const lesson = await this.lessonRepo.create(
        {
          ...createLessonData,
          createdBy: userId,
          lessonType: createLessonData.lessonType ?? 'link',
        },
        client,
      );
      await this.roadmaplessonRepo.link(roadmap_id, lesson.id, client);
      return lesson;
    });
  }

  async findAll() {
    return await this.lessonRepo.findAll();
  }

  async findById(id: string) {
    const lesson = await this.lessonRepo.findById(id);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
  }

  async findByRoadmap(roadmap_id: string) {
    return await this.lessonRepo.findByRoadmap(roadmap_id);
  }

  async findByTitle(title: string) {
    return await this.lessonRepo.findByTitle(title);
  }

  async update(id: string, updateLessonDto: UpdateLessonDto, userId: string) {
    const lesson = await this.lessonRepo.findById(id);
    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }
    if (lesson.createdBy !== userId) {
      throw new ForbiddenException('You cannot update this lesson');
    }
    return await this.lessonRepo.update(id, updateLessonDto);
  }

  async delete(id: string, userId: string) {
    const lesson = await this.lessonRepo.findById(id);

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    if (lesson.createdBy !== userId) {
      throw new ForbiddenException('You cannot delete this lesson');
    }
    const deleted = await this.lessonRepo.delete(id);

    if (!deleted) {
      throw new InternalServerErrorException('Failed to delete lesson');
    }
  }
}
