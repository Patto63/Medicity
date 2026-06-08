import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class ReportsService {
    constructor(
        @Inject('DATABASE_CONNECTION')
        private readonly connection: Pool,
    ) { }

    // === Reportes de Centro Médico ===

    async cuantasConsultasTieneCadaCentroMedico() {
        const [rows] = await this.connection.query(`
      SELECT 
        cm2.nombre, 
        (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM consulta_medica)) AS porcentaje_consultas
      FROM 
        consulta_medica cm
        INNER JOIN medico m ON m.id = cm.medico_id
        INNER JOIN centro_medico cm2 ON m.centro_medico_id = cm2.id
      GROUP BY 
        cm2.nombre
      ORDER BY 
        porcentaje_consultas DESC;
    `);
        return rows;
    }

    async obtenerTodasLasConsultas() {
        const [rows] = await this.connection.query(`
      SELECT 
        CONCAT(cm.paciente_nombre, " ", cm.paciente_apellido) AS paciente,
        cm.motivo,
        cm.fecha,
        CONCAT(m.nombre, " ", m.apellido) AS doctor,
        m.id AS cedula
      FROM
        consulta_medica cm 
        INNER JOIN medico m ON cm.medico_id = m.id;
    `);
        return rows;
    }

    async obtenerEmpleados() {
        const [rows] = await this.connection.query(`
      SELECT COUNT(*) AS TotalEmpleados FROM empleado;
    `);
        return rows;
    }

    async obtenerMedicos() {
        const [rows] = await this.connection.query(`
      SELECT COUNT(*) AS TotalMedicos FROM medico;
    `);
        return rows;
    }

    // === Reportes de Consultas Médicas ===

    async obtenerPorcentajesMotivos() {
        const [rows] = await this.connection.query(`
      SELECT 
        motivo, 
        (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM consulta_medica)) AS porcentaje_consultas
      FROM 
        consulta_medica
      GROUP BY 
        motivo
      ORDER BY 
        porcentaje_consultas DESC;
    `);
        return rows;
    }

    async obtenerPorcentajesMedico() {
        const [rows] = await this.connection.query(`
            SELECT 
        CONCAT (m.nombre ," " ,m.apellido ) as doctor,
        COUNT(cm.id) AS total_consultas
        FROM 
        consulta_medica cm
        INNER JOIN 
        medico m ON cm.medico_id = m.id
        GROUP BY 
        m.id, m.nombre, m.apellido
        ORDER BY 
        total_consultas DESC;

    `);
        return rows;
    }
}
