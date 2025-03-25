import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'test@example.com', description: 'Email пользователя' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Пароль' })
  @IsString()
  password: string;
}
