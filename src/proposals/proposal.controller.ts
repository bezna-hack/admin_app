  import { 
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
    Patch,
    Delete
  } from '@nestjs/common';
  import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
  import { ProposalService } from './proposal.service';
  
  @Controller('proposal')
  export class ProposalController {
    constructor(
      private readonly proposalService: ProposalService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    geProposal(@Request() req) {
      return this.proposalService.findOne(req.body._id)
    }

    @UseGuards(JwtAuthGuard)
    @Get('all-proposals')
    getAllProposals() {
      return this.proposalService.findMany({});
    }

    @UseGuards(JwtAuthGuard)
    @Post('filtered-proposals')
    getFilteredProposals(@Request() req) {
      return this.proposalService.findMany(req.body)
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createProposal(@Request() req){
      return this.proposalService.create(req.body)
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update')
    updateProposal(@Request() req) {
      return this.proposalService.update(req.body._id, req.body)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    deleteProposal(@Request() req) {
      return this.proposalService.delete(req.body._id)
    }
  }
  