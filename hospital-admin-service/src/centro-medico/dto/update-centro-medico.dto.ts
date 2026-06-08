import { PartialType } from '@nestjs/mapped-types';
import { CreateCentroMedicoDto } from './create-centro-medico.dto';

export class UpdateCentroMedicoDto extends PartialType(CreateCentroMedicoDto) {}
