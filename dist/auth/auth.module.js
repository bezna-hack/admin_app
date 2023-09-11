"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const async_hooks_1 = require("async_hooks");
const user_module_1 = require("../user/user.module");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const local_strategy_1 = require("./strategies/local.strategy");
const roles_guard_1 = require("./guards/roles.guard");
const constants_1 = require("./constants");
const user_schema_1 = require("../user/user.schema");
const mongoose_1 = require("@nestjs/mongoose");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            user_module_1.UserModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '3600s' }
            }),
            mongoose_1.MongooseModule.forFeature([{
                    name: user_schema_1.User.name,
                    schema: user_schema_1.UserSchema
                }])
        ],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            async_hooks_1.AsyncLocalStorage,
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            }
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map