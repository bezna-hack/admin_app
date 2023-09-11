"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageModule = void 0;
const common_1 = require("@nestjs/common");
const storage_service_1 = require("./storage.service");
const proposal_module_1 = require("../proposals/proposal.module");
const storage_controller_1 = require("./storage.controller");
const mongoose_1 = require("@nestjs/mongoose");
const storage_schema_1 = require("./storage.schema");
let StorageModule = class StorageModule {
};
StorageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            proposal_module_1.ProposalModule,
            mongoose_1.MongooseModule.forFeature([{ name: storage_schema_1.PortfolioFile.name, schema: storage_schema_1.PortfolioFileSchema }])
        ],
        providers: [storage_service_1.StorageService],
        controllers: [storage_controller_1.StorageController],
        exports: [storage_service_1.StorageService]
    })
], StorageModule);
exports.StorageModule = StorageModule;
//# sourceMappingURL=storage.module.js.map