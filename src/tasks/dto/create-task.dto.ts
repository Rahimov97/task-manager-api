import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export class CreateTaskDto {
  @ApiProperty({ example: 'Реализовать API', description: 'Название задачи' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Нужно реализовать все методы REST API',
    required: false,
    description: 'Описание задачи',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'pending',
    enum: TaskStatus,
    required: false,
    description: 'Статус задачи (по умолчанию: pending)',
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
