import { IsUUID } from 'class-validator';

export class FindRoadmapIdDto {
  @IsUUID()
  id: string;
}
