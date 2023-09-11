"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStorage = void 0;
const async_hooks_1 = require("async_hooks");
exports.UserStorage = {
    storage: new async_hooks_1.AsyncLocalStorage(),
    get() {
        return this.storage.getStore();
    },
    set(user) {
        return this.storage.enterWith(user);
    },
};
//# sourceMappingURL=user.storage.js.map