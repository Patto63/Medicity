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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CentroMedicoController = void 0;
const common_1 = require("@nestjs/common");
const centro_medico_service_1 = require("./centro-medico.service");
let CentroMedicoController = class CentroMedicoController {
    centroMedicoService;
    constructor(centroMedicoService) {
        this.centroMedicoService = centroMedicoService;
    }
    getPorcentajesConsultas() {
        return this.centroMedicoService.cuantasConsultasTieneCadaCentroMedico();
    }
    getConsultas() {
        return this.centroMedicoService.obtenerTodasLasConsultas();
    }
    getEmpleados() {
        return this.centroMedicoService.obtenerEmpleados();
    }
    getMedicos() {
        return this.centroMedicoService.obtenerMedicos();
    }
};
exports.CentroMedicoController = CentroMedicoController;
__decorate([
    (0, common_1.Get)('/porcentajePasientes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CentroMedicoController.prototype, "getPorcentajesConsultas", null);
__decorate([
    (0, common_1.Get)('/reporteConsultas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CentroMedicoController.prototype, "getConsultas", null);
__decorate([
    (0, common_1.Get)('/totalEmpleados'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CentroMedicoController.prototype, "getEmpleados", null);
__decorate([
    (0, common_1.Get)('/totalMedicos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CentroMedicoController.prototype, "getMedicos", null);
exports.CentroMedicoController = CentroMedicoController = __decorate([
    (0, common_1.Controller)('centro-medico'),
    __metadata("design:paramtypes", [centro_medico_service_1.CentroMedicoService])
], CentroMedicoController);
//# sourceMappingURL=centro-medico.controller.js.map