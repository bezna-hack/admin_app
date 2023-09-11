import { Module } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Proposal, ProposalSchema } from './proposal.schema';
import { UserModule } from 'src/user/user.module';
import { ProposalController } from './proposal.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Proposal.name, schema: ProposalSchema}]),
    UserModule
  ],
  providers: [ProposalService],
  controllers: [ProposalController],
  exports: [ProposalService],
})
export class ProposalModule {}