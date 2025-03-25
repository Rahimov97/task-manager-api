import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersRepo.findOneBy({ email: dto.email });
    if (existing) throw new ConflictException('Email already in use');

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = this.usersRepo.create({
      email: dto.email,
      password: hashed,
    });

    await this.usersRepo.save(user);
    const { password: _, ...result } = user;
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepo.findOneBy({ email: dto.email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token };
  }
}
