import { IsString } from 'class-validator';

export class FindRoadmapTitleDto {
  @IsString()
  title: string;
}
