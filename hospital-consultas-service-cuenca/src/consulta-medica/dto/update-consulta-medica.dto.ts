import { PartialType } from '@nestjs/mapped-types';
import { CreateConsultaMedicaDto } from './create-consulta-medica.dto';

export class UpdateConsultaMedicaDto extends PartialType(CreateConsultaMedicaDto) {}
