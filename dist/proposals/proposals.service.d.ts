import { Model } from 'mongoose';
import { Proposal } from './proposal.schema';
import { CreateProposalDto } from './create-proposal.dto';
export declare class ProposalsService {
    private proposalModel;
    constructor(proposalModel: Model<Proposal>);
    create(CreateProposalDto: CreateProposalDto): Promise<Proposal>;
    findOne(_id: string): Promise<Proposal[]>;
    findMany(filters: any): Promise<Proposal[]>;
    update(_id: string, newProposal: Proposal): Promise<Proposal>;
    delete(_id: string): Promise<Proposal>;
}
