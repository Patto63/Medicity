import { Module } from '@nestjs/common';
import { createPool } from 'mysql2/promise';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async () => {
        const pool = createPool({
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
  exports: ['DATABASE_CONNECTION'], 
})
export class DatabaseModule {}
