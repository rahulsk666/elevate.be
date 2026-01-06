import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { lessonPgRepository } from './repository/lesson.repository';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(private readonly lessonRepo: lessonPgRepository) {}
  async create(createLessonDto: CreateLessonDto, userId: string) {
    return await this.lessonRepo.create({
      ...createLessonDto,
      createdBy: userId,
      lessonType: createLessonDto.lessonType ?? 'link',
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
