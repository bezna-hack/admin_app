import { AuthService } from 'src/auth/auth.service';
import { UserService } from './user.service';
export declare class UserController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    getUser(req: any): Promise<import("./user.schema").User[]>;
    getByUsername(req: any): Promise<import("./user.schema").User[]>;
    getAllUsers(): Promise<import("./user.schema").User[]>;
    createUser(req: any): Promise<import("./user.schema").User>;
    updateUser(req: any): Promise<import("./user.schema").User>;
    deleteUser(req: any): Promise<import("./user.schema").User>;
    createUserDev(req: any): Promise<import("./user.schema").User>;
}
