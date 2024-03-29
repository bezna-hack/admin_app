"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const proposal_module_1 = require("./proposals/proposal.module");
const mongoose_1 = require("@nestjs/mongoose");
const storage_module_1 = require("./storage/storage.module");
const config_1 = require("@nestjs/config");
const mail_module_1 = require("./mail/mail.module");
const user_controller_1 = require("./user/user.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot('mongodb+srv://eduardnicolescu:KkKdJ4u3VDh66ARb@cluster0.1lt3e9g.mongodb.net/?retryWrites=true&w=majority'),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            proposal_module_1.ProposalModule,
            storage_module_1.StorageModule,
            mail_module_1.MailModule
        ],
        controllers: [user_controller_1.UserController]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map