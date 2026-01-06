import { IsUUID } from 'class-validator';

export class FindLessonIdDto {
  @IsUUID()
  id: string;
}
