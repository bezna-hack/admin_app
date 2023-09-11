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
exports.ProposalSchema = exports.Proposal = void 0;
const mongoose = require("mongoose");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("../user/user.schema");
let Proposal = class Proposal {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Proposal.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Proposal.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Proposal.prototype, "client", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Proposal.prototype, "date", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Proposal.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Proposal.prototype, "checklist", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Proposal.prototype, "checkpoint", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Proposal.prototype, "lead", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Proposal.prototype, "files", void 0);
__decorate([
    (0, mongoose_1.Prop)([String]),
    __metadata("design:type", Array)
], Proposal.prototype, "client_emails", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] }),
    __metadata("design:type", Array)
], Proposal.prototype, "assignees", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", user_schema_1.User)
], Proposal.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_2.raw)({
        user: { type: String },
        action: { type: String },
        date: { type: Date }
    })),
    __metadata("design:type", Object)
], Proposal.prototype, "logging", void 0);
Proposal = __decorate([
    (0, mongoose_1.Schema)()
], Proposal);
exports.Proposal = Proposal;
exports.ProposalSchema = mongoose_1.SchemaFactory.createForClass(Proposal);
//# sourceMappingURL=proposal.schema.js.map