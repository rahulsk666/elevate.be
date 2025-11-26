import { IsOptional, IsUUID } from 'class-validator';

export class IdParamDto {
  @IsUUID()
  @IsOptional()
  id: string;
}
