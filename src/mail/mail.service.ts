import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendEmail( email: string, message: string) {
    await this.mailerService.sendMail({
      to: email,
      from: 'eduard.nicolescu@thinslices.com',
      subject: 'This a presentation from Thinslices!',
      template: './template',
      context: { message: message },
    });
  }
}