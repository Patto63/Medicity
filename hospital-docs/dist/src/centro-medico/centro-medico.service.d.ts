import { Pool } from 'mysql2/promise';
export declare class CentroMedicoService {
    private readonly connection;
    constructor(connection: Pool);
    cuantasConsultasTieneCadaCentroMedico(): Promise<import("mysql2/promise").QueryResult>;
    obtenerTodasLasConsultas(): Promise<import("mysql2/promise").QueryResult>;
    obtenerEmpleados(): Promise<import("mysql2/promise").QueryResult>;
    obtenerMedicos(): Promise<import("mysql2/promise").QueryResult>;
}
