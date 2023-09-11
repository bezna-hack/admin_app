import { Role } from "src/auth/enums/role.enum";
export declare class CreateUserDto {
    readonly name: string;
    readonly password: string;
    readonly status: string;
    readonly roles: Role[];
}
