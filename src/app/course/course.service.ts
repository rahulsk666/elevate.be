import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import {
  COURSE_REPOSITORY,
  type CourseRepository,
} from './repository/course.interface.repository';
import {
  COURSE_ROADMAP_REPOSITOTY,
  type courseRoadmapRepository,
} from './repository/course_roadmap.interface.repository';

@Injectable()
export class CourseService {
  constructor(
    @Inject(COURSE_REPOSITORY) private readonly courseRepo: CourseRepository,
    @Inject(COURSE_ROADMAP_REPOSITOTY)
    private readonly courseRoadmapRepo: courseRoadmapRepository,
  ) {}
  async create(createCourseDto: CreateCourseDto, userId: string) {
    const { roadmap_id, ...courseData } = createCourseDto;
    const course = await this.courseRepo.create({
      ...courseData,
      createdBy: userId,
      status: createCourseDto.status ?? 'draft',
    });
    await this.courseRoadmapRepo.link(course.id, roadmap_id);
    return course;
  }

  async findAll() {
    return await this.courseRepo.findAll();
  }

  async findById(id: string) {
    const course = await this.courseRepo.findById(id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async findByTitle(title: string) {
    return await this.courseRepo.findByTitle(title);
  }

  async findByCondition(condition: Record<string, any>) {
    return await this.courseRepo.findByCondition(condition);
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, userId: string) {
    const course = await this.courseRepo.findById(id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    if (course.createdBy !== userId) {
      throw new ForbiddenException('You cannot update this course');
    }
    return await this.courseRepo.update(id, updateCourseDto);
  }

  async delete(id: string, userId: string) {
    const course = await this.courseRepo.findById(id);
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    if (course.createdBy !== userId) {
      throw new ForbiddenException('You cannot delete this course');
    }
    const deleted = await this.courseRepo.delete(id);

    if (!deleted) {
      throw new InternalServerErrorException('Failed to delete lesson');
    }
  }
}
