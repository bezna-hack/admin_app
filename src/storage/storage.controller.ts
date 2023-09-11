import {
    Body,
    Controller,
    NotFoundException,
    Get,
    Post,
    Res,
    Request,
    ServiceUnavailableException,
    UploadedFile,
    UseInterceptors,
    UseGuards,
    MaxFileSizeValidator,
    ParseFilePipe,
    BadGatewayException
  } from "@nestjs/common";
  import { FileInterceptor } from '@nestjs/platform-express';
  import { Express } from 'express';
  import { Response } from "express";
  import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
  import { StorageFile } from 'src/storage/storage-file';
  import { StorageService } from './storage.service';
  import { ProposalService } from "src/proposals/proposal.service";
  
  @Controller('storage')
  export class StorageController {
    constructor(
      private readonly storageService: StorageService,
      private readonly proposalService: ProposalService
    ) {}
    
    @UseGuards(JwtAuthGuard)
    @Post('proposal-upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadProposalFile(
      @UploadedFile(
        new ParseFilePipe({
          validators: [
            new MaxFileSizeValidator({ maxSize: 10000000 })
          ],
        })
      ) file: Express.Multer.File,
      @Body("fileId") fileId: string,
      @Request() req
    ) {
      req.body.proposal = JSON.parse(req.body.proposal)
      const filename = 'ts_sales/' + req.body.target + '_' + req.body.proposal._id + '_' + req.file.originalname.replace(/\s+/g, '')
      try{
        await this.storageService.save(
          filename,
          file.buffer,
          [{ fileId: fileId }]
        );
      }catch(e){
        throw new BadGatewayException(e)
      }
      req.body.proposal.files.push(filename)
      return this.proposalService.update(req.body.proposal._id, req.body.proposal)
    }

    @UseGuards(JwtAuthGuard)
    @Post('portfolio-upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadPortfolioFile(
      @UploadedFile(
        new ParseFilePipe({
          validators: [
            new MaxFileSizeValidator({ maxSize: 10000000 })
          ],
        })
      ) file: Express.Multer.File,
      @Body("fileId") fileId: string,
      @Request() req
    ) {
      const filename = 'ts_sales/portfolio_' + req.file.originalname.replace(/\s+/g, '')
      try{
        await this.storageService.save(
          filename,
          file.buffer,
          [{ fileId: fileId }]
        );
        this.storageService.savePortfolioFilename({ 'fileId': filename })
      }catch(e){
        // throw new BadGatewayException(e)
        throw new Error(e)
      }
      return this.storageService.savePortfolioFilename({'fileId': filename})
    }

    @UseGuards(JwtAuthGuard)
    @Post('get-file')
    async downloadMedia(@Request() req, @Res() res: Response) {
      let storageFile: StorageFile;
      try {
        storageFile = await this.storageService.get("ts_sales/" + req.body.fileId);
        } catch (e) {
        if (e.message.toString().includes("No such object")) {
          throw new NotFoundException("image not found");
        } else {
          throw new ServiceUnavailableException("internal error");
        }
      }
      res.setHeader("Cache-Control", "max-age=60d");
      res.end(storageFile.buffer);
    }

    @UseGuards(JwtAuthGuard)
    @Get('portfolio-filenames')
    getFilenames(){
      return this.storageService.getPortfolioFilenames()
    }
  }

  