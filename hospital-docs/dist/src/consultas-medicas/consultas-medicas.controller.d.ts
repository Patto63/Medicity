import { ConsultasMedicasService } from './consultas-medicas.service';
export declare class ConsultasMedicasController {
    private readonly consultasMedicasService;
    constructor(consultasMedicasService: ConsultasMedicasService);
    obtenerConsultasMedicasPorcentaje(): Promise<import("mysql2").QueryResult>;
    obtenerPorcentajesMedico(): Promise<import("mysql2").QueryResult>;
}
