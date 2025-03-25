import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto, TaskStatus } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepo: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User) {
    const task = this.tasksRepo.create({
      ...createTaskDto,
      status: createTaskDto.status || TaskStatus.PENDING,
      user,
    });
    return this.tasksRepo.save(task);
  }

  async findAll(user: User) {
    return this.tasksRepo.find({
      where: { user: { id: user.id } },
    });
  }

  async findOne(id: number, user: User) {
    const task = await this.tasksRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!task) throw new NotFoundException('Task not found');

    if (task.user.id !== user.id && user.role !== 'admin') {
      throw new ForbiddenException('Access denied');
    }

    return task;
  }

  async update(id: number, dto: UpdateTaskDto, user: User) {
    const task = await this.findOne(id, user);
    Object.assign(task, dto);
    return this.tasksRepo.save(task);
  }

  async remove(id: number, user: User) {
    const task = await this.findOne(id, user);
    return this.tasksRepo.remove(task);
  }
}
