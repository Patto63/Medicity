import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMedicoDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsNumber()
  @IsNotEmpty()
  especialidad_id: number;

  @IsNumber()
  @IsNotEmpty()
  centro_medico_id: number;

}
