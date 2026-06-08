import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateConsultaMedicaDto {
  @IsString()
  @IsNotEmpty()
  paciente_nombre: string;

  @IsString()
  @IsNotEmpty()
  paciente_apellido: string;

  @IsDateString()
  @IsNotEmpty()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  motivo: string;

  @IsString()
  @IsNotEmpty()
  medico_id: string;
}
