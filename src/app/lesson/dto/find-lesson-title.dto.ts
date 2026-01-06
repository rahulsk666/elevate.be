import { IsString } from 'class-validator';

export class FindLessonTitleDto {
  @IsString()
  title: string;
}
