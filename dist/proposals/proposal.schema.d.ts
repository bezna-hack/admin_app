import * as mongoose from 'mongoose';
import { User } from 'src/user/user.schema';
export type ProposalDocument = mongoose.HydratedDocument<Proposal>;
export declare class Proposal {
    name: string;
    description: string;
    client: string;
    date: Date;
    status: string;
    checklist: string[];
    checkpoint: string;
    lead: string;
    files: string[];
    client_emails: string[];
    assignees: User[];
    owner: User;
    logging: Record<string, any>;
}
export declare const ProposalSchema: mongoose.Schema<Proposal, mongoose.Model<Proposal, any, any, any, mongoose.Document<unknown, any, Proposal> & Omit<Proposal & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Proposal, mongoose.Document<unknown, {}, mongoose.FlatRecord<Proposal>> & Omit<mongoose.FlatRecord<Proposal> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
