/// <reference types="node" />
import { StorageFile } from "./storage-file";
import { Model } from "mongoose";
import { PortfolioFile } from "./storage.schema";
import { PortfolioFilenameDto } from "./create-portfolio-filename.dto";
export declare class StorageService {
    private portfolioFileModel;
    private storage;
    private bucket;
    constructor(portfolioFileModel: Model<PortfolioFile>);
    save(path: string, fileStream: Buffer, metadata: {
        [key: string]: string;
    }[]): Promise<void>;
    delete(path: string): Promise<void>;
    get(path: string): Promise<StorageFile>;
    getWithMetaData(path: string): Promise<StorageFile>;
    getPortfolioFilenames(): Promise<PortfolioFile[]>;
    savePortfolioFilename(portfolioFilenameDto: PortfolioFilenameDto): Promise<PortfolioFile>;
}
