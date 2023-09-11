import { 
  Controller,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('send')
  getUser(@Request() req) {
    return this.mailService.sendEmail(req.body.email, req.body.message)
  }

}