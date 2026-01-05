import { IsNotEmpty, IsString } from 'class-validator';

export class FindRoadmapTitleDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
