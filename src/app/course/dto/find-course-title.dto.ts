import { IsString } from 'class-validator';

export class FindCourseTitleDto {
  @IsString()
  title: string;
}
