"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlsModule = void 0;
const common_1 = require("@nestjs/common");
const async_hooks_1 = require("async_hooks");
let AlsModule = class AlsModule {
};
AlsModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: async_hooks_1.AsyncLocalStorage,
                useValue: new async_hooks_1.AsyncLocalStorage(),
            },
        ],
        exports: [async_hooks_1.AsyncLocalStorage],
    })
], AlsModule);
exports.AlsModule = AlsModule;
//# sourceMappingURL=als.module.js.map