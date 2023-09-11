import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Proposal } from './proposal.schema';
import { CreateProposalDto } from './create-proposal.dto';
import { UserService } from 'src/user/user.service';



@Injectable()
export class ProposalService {
  constructor(@InjectModel(Proposal.name) private proposalModel: Model<Proposal>) {}

  async create(CreateProposalDto: CreateProposalDto): Promise<Proposal> {
    const newProposal = new this.proposalModel(CreateProposalDto)
    return newProposal.save()
  }

  async findOne(_id: string): Promise<Proposal[]> {
    return this.proposalModel.findById(_id)
  }

  async findMany(filters): Promise<Proposal[]> {
    return this.proposalModel.find(filters).exec()
  }

  async update(_id: string, newProposal: Proposal): Promise<Proposal> {
    return this.proposalModel.findOneAndUpdate({ _id: _id }, newProposal).exec()
  }

  async delete(_id: string): Promise<Proposal> {
    return this.proposalModel.findByIdAndRemove(_id)
  }
}