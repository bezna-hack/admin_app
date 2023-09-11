import { ProposalService } from './proposal.service';
export declare class ProposalController {
    private readonly proposalService;
    constructor(proposalService: ProposalService);
    geProposal(req: any): Promise<import("./proposal.schema").Proposal[]>;
    getAllProposals(): Promise<import("./proposal.schema").Proposal[]>;
    getFilteredProposals(req: any): Promise<import("./proposal.schema").Proposal[]>;
    createProposal(req: any): Promise<import("./proposal.schema").Proposal>;
    updateProposal(req: any): Promise<import("./proposal.schema").Proposal>;
    deleteProposal(req: any): Promise<import("./proposal.schema").Proposal>;
}
