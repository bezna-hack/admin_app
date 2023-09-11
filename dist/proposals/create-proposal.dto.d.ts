export declare class CreateProposalDto {
    readonly name: string;
    readonly description: string;
    readonly client: string;
    readonly date: Date;
    readonly status: string;
    readonly checklist: string[];
    readonly checkpoint: string;
    readonly lead: string;
    readonly files: string[];
    readonly email: string;
    readonly assignees: string[];
    readonly owner: string;
}
