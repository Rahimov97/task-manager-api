  import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe,} from '@nestjs/common';
  import { TasksService } from './tasks.service';
  import { CreateTaskDto } from './dto/create-task.dto';
  import { UpdateTaskDto } from './dto/update-task.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
  
  @ApiTags('Tasks')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Controller('tasks')
  export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    @Post()
    @ApiOperation({ summary: 'Создать новую задачу' })
    create(@Body() dto: CreateTaskDto, @Req() req) {
      return this.tasksService.create(dto, req.user);
    }
  
    @Get()
    @ApiOperation({ summary: 'Получить все задачи текущего пользователя' })
    findAll(@Req() req) {
      return this.tasksService.findAll(req.user);
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Получить одну задачу по ID' })
    findOne(@Param('id', ParseIntPipe) id: number, @Req() req) {
      return this.tasksService.findOne(id, req.user);
    }
  
    @Patch(':id')
    @ApiOperation({ summary: 'Обновить задачу' })
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto, @Req() req) {
      return this.tasksService.update(id, dto, req.user);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Удалить задачу' })
    remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
      return this.tasksService.remove(id, req.user);
    }
  }
  