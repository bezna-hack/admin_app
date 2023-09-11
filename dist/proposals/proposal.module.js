"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalModule = void 0;
const common_1 = require("@nestjs/common");
const proposal_service_1 = require("./proposal.service");
const mongoose_1 = require("@nestjs/mongoose");
const proposal_schema_1 = require("./proposal.schema");
const user_module_1 = require("../user/user.module");
const proposal_controller_1 = require("./proposal.controller");
let ProposalModule = class ProposalModule {
};
ProposalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: proposal_schema_1.Proposal.name, schema: proposal_schema_1.ProposalSchema }]),
            user_module_1.UserModule
        ],
        providers: [proposal_service_1.ProposalService],
        controllers: [proposal_controller_1.ProposalController],
        exports: [proposal_service_1.ProposalService],
    })
], ProposalModule);
exports.ProposalModule = ProposalModule;
//# sourceMappingURL=proposal.module.js.map