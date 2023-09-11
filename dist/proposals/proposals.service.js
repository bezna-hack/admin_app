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
exports.ProposalsService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const proposal_schema_1 = require("./proposal.schema");
let ProposalsService = class ProposalsService {
    constructor(proposalModel) {
        this.proposalModel = proposalModel;
    }
    async create(CreateProposalDto) {
        const newProposal = new this.proposalModel(CreateProposalDto);
        return newProposal.save();
    }
    async findOne(_id) {
        return this.proposalModel.findById(_id);
    }
    async findMany(filters) {
        return this.proposalModel.find(filters);
    }
    async update(_id, newProposal) {
        return this.proposalModel.findOneAndUpdate({ _id: _id }, newProposal).exec();
    }
    async delete(_id) {
        return this.proposalModel.findByIdAndRemove(_id);
    }
};
ProposalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(proposal_schema_1.Proposal.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ProposalsService);
exports.ProposalsService = ProposalsService;
//# sourceMappingURL=proposals.service.js.map