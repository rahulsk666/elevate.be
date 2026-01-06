import { IsNotEmpty, IsString } from 'class-validator';

export class FindLessonTitleDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
