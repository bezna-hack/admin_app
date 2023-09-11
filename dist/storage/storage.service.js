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
exports.StorageService = void 0;
const storage_file_1 = require("./storage-file");
const storage_1 = require("@google-cloud/storage");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const common_1 = require("@nestjs/common");
const storage_schema_1 = require("./storage.schema");
const storage_config_1 = require("./storage-config");
let StorageService = class StorageService {
    constructor(portfolioFileModel) {
        this.portfolioFileModel = portfolioFileModel;
        this.storage = new storage_1.Storage({
            projectId: storage_config_1.default.projectId,
            credentials: {
                client_email: storage_config_1.default.client_email,
                private_key: storage_config_1.default.private_key.replace(/\\n/gm, "\n"),
            },
        });
        this.bucket = storage_config_1.default.mediaBucket;
    }
    async save(path, fileStream, metadata) {
        const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
        const file = this.storage.bucket(this.bucket).file(path);
        const stream = file.createWriteStream();
        stream.on("finish", async () => {
            return await file.setMetadata({
                metadata: object,
            });
        });
        stream.end(fileStream);
    }
    async delete(path) {
        await this.storage
            .bucket(this.bucket)
            .file(path)
            .delete({ ignoreNotFound: true });
    }
    async get(path) {
        const fileResponse = await this.storage
            .bucket(this.bucket)
            .file(path)
            .download();
        const [buffer] = fileResponse;
        const storageFile = new storage_file_1.StorageFile();
        storageFile.buffer = buffer;
        storageFile.metadata = new Map();
        return storageFile;
    }
    async getWithMetaData(path) {
        const [metadata] = await this.storage
            .bucket(this.bucket)
            .file(path)
            .getMetadata();
        const fileResponse = await this.storage
            .bucket(this.bucket)
            .file(path)
            .download();
        const [buffer] = fileResponse;
        const storageFile = new storage_file_1.StorageFile();
        storageFile.buffer = buffer;
        storageFile.metadata = new Map(Object.entries(metadata || {}));
        storageFile.contentType = storageFile.metadata.get("contentType");
        return storageFile;
    }
    async getPortfolioFilenames() {
        return this.portfolioFileModel.find({});
    }
    async savePortfolioFilename(portfolioFilenameDto) {
        const portfolioFilename = new this.portfolioFileModel(portfolioFilenameDto);
        return portfolioFilename.save();
    }
};
StorageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(storage_schema_1.PortfolioFile.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map