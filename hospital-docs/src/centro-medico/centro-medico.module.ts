import { Module } from '@nestjs/common';
import { CentroMedicoService } from './centro-medico.service';
import { CentroMedicoController } from './centro-medico.controller';
import { DatabaseModule } from 'database/database.module';

@Module({
  controllers: [CentroMedicoController],
  providers: [CentroMedicoService],
  imports: [DatabaseModule]
})
export class CentroMedicoModule { }
