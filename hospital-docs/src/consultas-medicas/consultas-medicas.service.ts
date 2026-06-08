import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class ConsultasMedicasService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly connection: Pool,
  ) {}
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
      medico_id, 
      (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM consulta_medica)) AS porcentaje_consultas
    FROM 
      consulta_medica
    GROUP BY 
      medico_id
    ORDER BY 
      porcentaje_consultas DESC;
    `);
      return rows;
  }

}
