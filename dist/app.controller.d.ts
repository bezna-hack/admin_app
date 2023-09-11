/// <reference types="multer" />
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { ProposalsService } from './proposals/proposals.service';
export declare class AppController {
    private readonly authService;
    private readonly usersService;
    private readonly proposalService;
    constructor(authService: AuthService, usersService: UsersService, proposalService: ProposalsService);
    login(req: any): Promise<{
        access_token: string;
    }>;
    getUser(req: any): Promise<import("./users/user.schema").User[]>;
    getAllUsers(): Promise<import("./users/user.schema").User[]>;
    createUser(req: any): Promise<import("./users/user.schema").User>;
    updateUser(req: any): Promise<import("./users/user.schema").User>;
    deleteUser(req: any): Promise<import("./users/user.schema").User>;
    geProposal(req: any): Promise<import("./proposals/proposal.schema").Proposal[]>;
    getAllProposals(): Promise<import("./proposals/proposal.schema").Proposal[]>;
    createProposal(req: any): Promise<import("./proposals/proposal.schema").Proposal>;
    updateProposal(req: any): Promise<import("./proposals/proposal.schema").Proposal>;
    deleteProposal(req: any): Promise<import("./proposals/proposal.schema").Proposal>;
    uploadFile(file: Express.Multer.File): void;
}
