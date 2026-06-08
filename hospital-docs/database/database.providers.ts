import { createPool } from 'mysql2/promise';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const pool = await createPool({
        host: '20.49.48.78',
        port: 3306,
        user: 'medicity_user',
        password: 'Medicity@2025',
        database: 'hospital_db',
        connectionLimit: 10,
      });
      return pool;
    },
  },
];
