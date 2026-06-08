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
exports.ConsultasMedicasService = void 0;
const common_1 = require("@nestjs/common");
let ConsultasMedicasService = class ConsultasMedicasService {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
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
};
exports.ConsultasMedicasService = ConsultasMedicasService;
exports.ConsultasMedicasService = ConsultasMedicasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [Object])
], ConsultasMedicasService);
//# sourceMappingURL=consultas-medicas.service.js.map