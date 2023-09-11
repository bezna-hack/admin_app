/// <reference types="multer" />
import { Response } from "express";
import { StorageService } from './storage.service';
import { ProposalService } from "src/proposals/proposal.service";
export declare class StorageController {
    private readonly storageService;
    private readonly proposalService;
    constructor(storageService: StorageService, proposalService: ProposalService);
    uploadProposalFile(file: Express.Multer.File, fileId: string, req: any): Promise<import("../proposals/proposal.schema").Proposal>;
    uploadPortfolioFile(file: Express.Multer.File, fileId: string, req: any): Promise<void>;
    downloadMedia(req: any, res: Response): Promise<void>;
    getFilenames(): Promise<import("./storage.schema").PortfolioFile[]>;
}
