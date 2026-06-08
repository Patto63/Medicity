import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateConsultaMedicaDto {
  @ApiProperty({ example: 'Juan' })
  @IsString()
  @IsNotEmpty()
  paciente_nombre: string;

  @ApiProperty({ example: 'Pérez' })
  @IsString()
  @IsNotEmpty()
  paciente_apellido: string;

  @ApiProperty({ example: '2025-06-01T10:30:00Z', description: 'Fecha y hora en formato ISO 8601' })
  @IsDateString()
  @IsNotEmpty()
  fecha: string;

  @ApiProperty({ example: 'Dolor de cabeza persistente' })
  @IsString()
  @IsNotEmpty()
  motivo: string;

  @ApiProperty({ example: '0102030405' })
  @IsString()
  @IsNotEmpty()
  medico_id: string;
}
