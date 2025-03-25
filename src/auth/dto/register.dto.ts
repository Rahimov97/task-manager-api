import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'test@example.com', description: 'Email пользователя' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Пароль (минимум 6 символов)' })
  @IsString()
  @MinLength(6)
  password: string;
}
