import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EspecialidadModule } from './especialidad/especialidad.module';
import { Especialidad } from './especialidad/entities/especialidad.entity';
import { Medico } from './medico/entities/medico.entity';
import { MedicoModule } from './medico/medico.module';
import { CentroMedicoModule } from './centro-medico/centro-medico.module';
import { CentroMedico } from './centro-medico/entities/centro-medico.entity';
import { EmpleadoModule } from './empleado/empleado.module';
import { Empleado } from './empleado/entity/empleado.entity';
import { ReportsModule } from './reports/reports.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities:[Especialidad,Medico,CentroMedico,Empleado],
      autoLoadEntities: true,
      synchronize: true, 
    }),

    EspecialidadModule,
    MedicoModule,
    CentroMedicoModule,
    EmpleadoModule,
    ReportsModule, 
  ],
  controllers: [AppController],
  providers: [AppService
    ,
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        const mysql = await import('mysql2/promise');
        const pool = mysql.createPool({
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT ?? '3306'),
          user: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          waitForConnections: true,
          connectionLimit: 10,
          queueLimit: 0,
        });
        return pool;
      },
    },
  ],
})
export class AppModule {}
