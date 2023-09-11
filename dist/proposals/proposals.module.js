"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalsModule = void 0;
const common_1 = require("@nestjs/common");
const proposals_service_1 = require("./proposals.service");
const mongoose_1 = require("@nestjs/mongoose");
const proposal_schema_1 = require("./proposal.schema");
const async_hooks_1 = require("async_hooks");
const user_module_1 = require("../user/user.module");
let ProposalsModule = class ProposalsModule {
};
ProposalsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: proposal_schema_1.Proposal.name, schema: proposal_schema_1.ProposalSchema }]),
            user_module_1.UserModule
        ],
        providers: [
            proposals_service_1.ProposalsService,
            async_hooks_1.AsyncLocalStorage
        ],
        exports: [proposals_service_1.ProposalsService],
    })
], ProposalsModule);
exports.ProposalsModule = ProposalsModule;
//# sourceMappingURL=proposals.module.js.map