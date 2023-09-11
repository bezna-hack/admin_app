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
exports.UserService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("./user.schema");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(CreateUserDto) {
        const newUser = new this.userModel(CreateUserDto);
        bcrypt.hash(newUser.password, 10, function (err, hash) {
            if (hash) {
                newUser.password = hash;
                return newUser.save();
            }
            return err;
        });
        return null;
    }
    async findOneById(_id) {
        return await this.userModel.findById(_id, '-password');
    }
    async findOne(param) {
        return this.userModel.find(param).exec();
    }
    async findAll() {
        return this.userModel.find({}, '-password').exec();
    }
    async update(_id, newUser) {
        if (newUser.password) {
            bcrypt.hash(newUser.password, 10, function (err, hash) {
                if (hash) {
                    newUser.password = hash;
                    return this.userModel.findOneAndUpdate({ _id: _id }, newUser).exec();
                }
                return err;
            });
        }
        return null;
    }
    async delete(_id) {
        return this.userModel.findByIdAndRemove(_id);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map