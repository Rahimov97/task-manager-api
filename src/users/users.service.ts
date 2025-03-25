import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepo.find({ select: ['id', 'email', 'role'] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { id },
      select: ['id', 'email', 'role'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
