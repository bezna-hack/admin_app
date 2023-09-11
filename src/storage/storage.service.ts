import { StorageFile } from "./storage-file";
import { DownloadResponse, Storage } from "@google-cloud/storage";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { PortfolioFile } from "./storage.schema";
import { PortfolioFilenameDto } from "./create-portfolio-filename.dto";
import StorageConfig from "./storage-config";

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: string;

  constructor(@InjectModel(PortfolioFile.name) private portfolioFileModel: Model<PortfolioFile>) {
    this.storage = new Storage({
      projectId: StorageConfig.projectId,
      credentials: {
        client_email: StorageConfig.client_email,
        private_key: StorageConfig.private_key.replace(/\\n/gm, "\n"),
      },
      });
    this.bucket = StorageConfig.mediaBucket;
  }

  async save(
    path: string,
    fileStream: Buffer,
    metadata: { [key: string]: string }[]
  ) {
    const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
    const file = this.storage.bucket(this.bucket).file(path);
    const stream = file.createWriteStream();
    stream.on("finish", async () => {
      return await file.setMetadata({
        metadata: object,
      });
    });
    stream.end(fileStream);
  }

  async delete(path: string) {
    await this.storage
      .bucket(this.bucket)
      .file(path)
      .delete({ ignoreNotFound: true });
  }

  async get(path: string): Promise<StorageFile> {
    const fileResponse: DownloadResponse = await this.storage
      .bucket(this.bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;
    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>();
    return storageFile;
  }

  async getWithMetaData(path: string): Promise<StorageFile> {
    const [metadata] = await this.storage
      .bucket(this.bucket)
      .file(path)
      .getMetadata();
    const fileResponse: DownloadResponse = await this.storage
      .bucket(this.bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;

    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>(
      Object.entries(metadata || {})
    );
    storageFile.contentType = storageFile.metadata.get("contentType");
    return storageFile;
  }

  async getPortfolioFilenames(): Promise<PortfolioFile[]>{
    return this.portfolioFileModel.find({})
  }

  async savePortfolioFilename(portfolioFilenameDto: PortfolioFilenameDto): Promise<PortfolioFile>{
    const portfolioFilename = new this.portfolioFileModel(portfolioFilenameDto)
    return portfolioFilename.save()
  }
}