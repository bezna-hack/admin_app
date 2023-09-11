import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { ProposalModule } from 'src/proposals/proposal.module';
import { StorageController } from './storage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PortfolioFile, PortfolioFileSchema } from './storage.schema';

@Module({
  imports: [
    ProposalModule,
    MongooseModule.forFeature([{ name: PortfolioFile.name, schema: PortfolioFileSchema}])
  ],
  providers: [StorageService],
  controllers: [StorageController],
  exports: [StorageService]
})
export class StorageModule {}
