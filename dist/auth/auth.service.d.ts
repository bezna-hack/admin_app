import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    constructor(jwtService: JwtService, userService: UserService);
    validateUser(username: string, plainPass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
}
