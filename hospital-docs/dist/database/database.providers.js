"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const promise_1 = require("mysql2/promise");
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async () => {
            const pool = await (0, promise_1.createPool)({
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
//# sourceMappingURL=database.providers.js.map