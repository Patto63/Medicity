import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmpleadoDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  rol: string;

  @IsNotEmpty()
  centro_medico_id: number;
}
