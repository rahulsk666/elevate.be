import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CoursePgRepository } from './repository/course.repository';

@Injectable()
export class CourseService {
  constructor(private readonly courseRepo: CoursePgRepository) {}
  async create(createCourseDto: CreateCourseDto, userId: string) {
    return await this.courseRepo.create({
      ...createCourseDto,
      createdBy: userId,
      status: createCourseDto.status ?? 'draft',
    });
  }

  async findAll() {
    return await this.courseRepo.findAll();
  }

  async findById(id: string) {
    return await this.courseRepo.findById(id);
  }

  async findByCondition(condition: Record<string, any>) {
    return await this.courseRepo.findByCondition(condition);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, userId: string) {
    const course = await this.courseRepo.findByCondition({ id });
    if (course.length === 0) {
      throw new NotFoundException('Course not found');
    }
    if (course[0].createdBy !== userId) {
      throw new ForbiddenException('You cannot update this course');
    }
    return await this.courseRepo.update(id, updateCourseDto);
  }

  async delete(id: string, userId: string) {
    const course = await this.courseRepo.findByCondition({ id });

    if (course.length === 0) {
      throw new NotFoundException('Course not found');
    }

    if (course[0].createdBy !== userId) {
      throw new ForbiddenException('You cannot delete this course');
    }
    await this.courseRepo.delete(id);

    return { message: 'Course deleted successfully' };
  }
}
