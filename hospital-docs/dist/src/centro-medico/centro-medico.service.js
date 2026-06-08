"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CentroMedicoService = void 0;
const common_1 = require("@nestjs/common");
let CentroMedicoService = class CentroMedicoService {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
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
    async obtenerEmpleados() {
        const [rows] = await this.connection.query(`SELECT COUNT (*) As TotalEmpleados FROM empleado e;`);
        return rows;
    }
    async obtenerMedicos() {
        const [rows] = await this.connection.query(`SELECT COUNT (*) As TotalMedicos FROM medico e;`);
        return rows;
    }
};
exports.CentroMedicoService = CentroMedicoService;
exports.CentroMedicoService = CentroMedicoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [Object])
], CentroMedicoService);
//# sourceMappingURL=centro-medico.service.js.map