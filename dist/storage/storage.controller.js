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
exports.StorageController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const storage_service_1 = require("./storage.service");
const proposal_service_1 = require("../proposals/proposal.service");
let StorageController = class StorageController {
    constructor(storageService, proposalService) {
        this.storageService = storageService;
        this.proposalService = proposalService;
    }
    async uploadProposalFile(file, fileId, req) {
        req.body.proposal = JSON.parse(req.body.proposal);
        const filename = 'ts_sales/' + req.body.target + '_' + req.body.proposal._id + '_' + req.file.originalname.replace(/\s+/g, '');
        try {
            await this.storageService.save(filename, file.buffer, [{ fileId: fileId }]);
        }
        catch (e) {
            throw new common_1.BadGatewayException(e);
        }
        req.body.proposal.files.push(filename);
        return this.proposalService.update(req.body.proposal._id, req.body.proposal);
    }
    async uploadPortfolioFile(file, fileId, req) {
        const filename = 'ts_sales/portfolio_' + req.file.originalname.replace(/\s+/g, '');
        try {
            await this.storageService.save(filename, file.buffer, [{ fileId: fileId }]);
            this.storageService.savePortfolioFilename({ 'fileId': filename });
        }
        catch (e) {
            throw new common_1.BadGatewayException(e);
        }
    }
    async downloadMedia(req, res) {
        let storageFile;
        try {
            storageFile = await this.storageService.get("ts_sales/" + req.body.fileId);
        }
        catch (e) {
            if (e.message.toString().includes("No such object")) {
                throw new common_1.NotFoundException("image not found");
            }
            else {
                throw new common_1.ServiceUnavailableException("internal error");
            }
        }
        res.setHeader("Cache-Control", "max-age=60d");
        res.end(storageFile.buffer);
    }
    getFilenames() {
        return this.storageService.getPortfolioFilenames();
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('proposal-upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 10000000 })
        ],
    }))),
    __param(1, (0, common_1.Body)("fileId")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "uploadProposalFile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('portfolio-upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 10000000 })
        ],
    }))),
    __param(1, (0, common_1.Body)("fileId")),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "uploadPortfolioFile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('get-file'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StorageController.prototype, "downloadMedia", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('portfolio-filenames'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StorageController.prototype, "getFilenames", null);
StorageController = __decorate([
    (0, common_1.Controller)('storage'),
    __metadata("design:paramtypes", [storage_service_1.StorageService,
        proposal_service_1.ProposalService])
], StorageController);
exports.StorageController = StorageController;
//# sourceMappingURL=storage.controller.js.map