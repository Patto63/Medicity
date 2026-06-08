import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsultaMedicaModule } from './consulta-medica/consulta-medica.module';
import { ConsultaMedica } from './consulta-medica/entities/consulta-medica.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities:[ConsultaMedica],
      autoLoadEntities: true,
      synchronize: true, 
    }),

    ConsultaMedicaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

