import { CentroMedicoService } from './centro-medico.service';
export declare class CentroMedicoController {
    private readonly centroMedicoService;
    constructor(centroMedicoService: CentroMedicoService);
    getPorcentajesConsultas(): Promise<import("mysql2").QueryResult>;
    getConsultas(): Promise<import("mysql2").QueryResult>;
    getEmpleados(): Promise<import("mysql2").QueryResult>;
    getMedicos(): Promise<import("mysql2").QueryResult>;
}
