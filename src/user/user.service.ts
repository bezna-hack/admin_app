import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(CreateUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(CreateUserDto)
    bcrypt.hash(newUser.password, 10, function(err, hash) {
      if(hash){
        newUser.password = hash
        return newUser.save()
      }
      return err
    });
    return null
  }

  async findOneById(_id: string): Promise<User[]> {
    return await this.userModel.findById(_id, '-password');
  }

  async findOne(param: any): Promise<User[]> {
    // return this.userModel.find(param, '-password').exec();
    return this.userModel.find(param).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, '-password').exec();
  }

  async update(_id: string, newUser: User): Promise<User> {
    if(newUser.password){
      bcrypt.hash(newUser.password, 10, function(err, hash) {
      if(hash){
        newUser.password = hash
          return this.userModel.findOneAndUpdate({ _id: _id }, newUser).exec();
        }
        return err
      });
    }
    return null
  }

  async delete(_id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(_id);
  }
}
