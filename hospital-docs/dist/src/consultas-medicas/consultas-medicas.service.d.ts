import { Pool } from 'mysql2/promise';
export declare class ConsultasMedicasService {
    private readonly connection;
    constructor(connection: Pool);
    obtenerPorcentajesMotivos(): Promise<import("mysql2/promise").QueryResult>;
    obtenerPorcentajesMedico(): Promise<import("mysql2/promise").QueryResult>;
}
