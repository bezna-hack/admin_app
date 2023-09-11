import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './create-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    create(CreateUserDto: CreateUserDto): Promise<User>;
    findOneById(_id: string): Promise<User[]>;
    findOne(username: string): Promise<User[]>;
    findAll(): Promise<User[]>;
    update(_id: string, newUser: User): Promise<User>;
    delete(_id: string): Promise<User>;
}
