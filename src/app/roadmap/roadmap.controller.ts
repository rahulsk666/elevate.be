import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { RoadmapService } from './roadmap.service';
import { User } from 'src/common/decorators/user.decorator';
import { CreateRoadmapDto } from './dto/create-roadmap.dto';
import { FindRoadmapIdDto } from './dto/find-roadmap-id.dto';
import { FindRoadmapTitleDto } from './dto/find-roadmap-title.dto';
import { UpdateRoadmapDto } from './dto/update-roadmap.dto';

@Controller('roadmap')
export class RoadmapController {
  constructor(private readonly roadmapService: RoadmapService) {}
  @Post()
  create(
    @Body() createRoadmapDto: CreateRoadmapDto,
    @User('id') userId: string,
  ) {
    return this.roadmapService.create(createRoadmapDto, userId);
  }

  @Get('search')
  findByTitle(@Query() query: FindRoadmapTitleDto) {
    return this.roadmapService.findByTitle(query.title);
  }

  @Get()
  findAll() {
    return this.roadmapService.findAll();
  }

  @Get(':id')
  findOne(@Param() param: FindRoadmapIdDto) {
    return this.roadmapService.findById(param.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRoadmapDto: UpdateRoadmapDto,
    @User('id') userId: string,
  ) {
    return this.roadmapService.update(id, updateRoadmapDto, userId);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string, @User('id') userId: string): Promise<void> {
    return this.roadmapService.delete(id, userId);
  }
}
