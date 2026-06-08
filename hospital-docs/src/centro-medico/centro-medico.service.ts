import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'mysql2/promise';

@Injectable()
export class CentroMedicoService {
  constructor(
    @Inject('DATABASE_CONNECTION')
    private readonly connection: Pool,
  ) { }
  async cuantasConsultasTieneCadaCentroMedico() {
    const [rows] = await this.connection.query(`
    SELECT 
      cm2.nombre , 
      (COUNT(*) * 100.0 / (SELECT COUNT(*) FROM consulta_medica)) AS porcentaje_consultas
    FROM 
      consulta_medica cm
      Inner Join medico m 
      on m.id =cm.medico_id
      Inner Join centro_medico cm2 
      ON m.centro_medico_id =cm2.id
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
  CONCAT(cm.paciente_nombre," ",cm.paciente_apellido) AS paciente,
  cm.motivo,
  cm.fecha,
  CONCAT(m.nombre," ",m.apellido )As doctor,
  m.id AS cedula
  FROM
  consulta_medica cm 
  Inner Join medico m 
  ON cm.medico_id =m.id;
    `);
    return rows;
  }

  async obtenerEmpleados(){
    const [rows] = await this.connection.query(`SELECT COUNT (*) As TotalEmpleados FROM empleado e;`);
    return rows;
  }

  async obtenerMedicos(){
    const [rows] = await this.connection.query(`SELECT COUNT (*) As TotalMedicos FROM medico e;`);
    return rows;
  }

}
