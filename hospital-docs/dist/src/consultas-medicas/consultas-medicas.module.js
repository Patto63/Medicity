"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultasMedicasModule = void 0;
const common_1 = require("@nestjs/common");
const consultas_medicas_service_1 = require("./consultas-medicas.service");
const consultas_medicas_controller_1 = require("./consultas-medicas.controller");
const database_module_1 = require("../../database/database.module");
let ConsultasMedicasModule = class ConsultasMedicasModule {
};
exports.ConsultasMedicasModule = ConsultasMedicasModule;
exports.ConsultasMedicasModule = ConsultasMedicasModule = __decorate([
    (0, common_1.Module)({
        controllers: [consultas_medicas_controller_1.ConsultasMedicasController],
        providers: [consultas_medicas_service_1.ConsultasMedicasService],
        imports: [database_module_1.DatabaseModule]
    })
], ConsultasMedicasModule);
//# sourceMappingURL=consultas-medicas.module.js.map