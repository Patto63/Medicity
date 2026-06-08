import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IsCedulaEcuatoriana } from '../../common/validators/cedula.validator';

export class CreateUserDto {
  @ApiProperty({ example: 'ejemplo@correo.com' })
  @IsEmail()
  correo: string;

  @ApiProperty({ example: 'miContraseña123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: ['medico', 'admin'], example: 'admin' })
  @IsEnum(['medico', 'admin'], { message: 'El rol debe ser medico o admin' })
  rol: 'medico' | 'admin';

  @ApiPropertyOptional({ example: '0102030405', description: 'Cédula del médico si aplica' })
  @IsOptional()
  @IsCedulaEcuatoriana({ message: 'La cédula ingresada no es válida' })
  medico_id?: string;

  @ApiPropertyOptional({ example: '0102030406', description: 'Cédula del empleado si aplica' })
  @IsOptional()
  @IsCedulaEcuatoriana({ message: 'La cédula ingresada no es válida' })
  empleado_id?: string;
}
