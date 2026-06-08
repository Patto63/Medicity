import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsultasMedicasModule } from './consultas-medicas/consultas-medicas.module';
import { DatabaseModule } from 'database/database.module';
import { CentroMedicoModule } from './centro-medico/centro-medico.module';

@Module({
  imports: [ConsultasMedicasModule,DatabaseModule,  CentroMedicoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
