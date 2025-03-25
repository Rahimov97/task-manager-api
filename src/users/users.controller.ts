import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles('admin')
  @Get()
  @ApiOperation({ summary: 'Получить всех пользователей (только для admin)' })
  findAll() {
    return this.usersService.findAll();
  }

  @Roles('admin')
  @Get(':id')
  @ApiOperation({ summary: 'Получить одного пользователя по ID (только для admin)' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }
}
