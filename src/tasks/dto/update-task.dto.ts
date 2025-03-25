import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatus } from './create-task.dto';

export class UpdateTaskDto {
  @ApiPropertyOptional({ example: 'Обновлённый заголовок задачи' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Новое описание задачи' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'done', enum: TaskStatus })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
