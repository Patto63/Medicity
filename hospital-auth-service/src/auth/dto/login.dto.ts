import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'ejemplo@correo.com' })
  @IsEmail()
  correo: string;

  @ApiProperty({ example: 'miContraseña123' })
  @IsString()
  password: string;
}
