import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { MailController } from './mail.controller';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'email-smtp.eu-north-1.amazonaws.com',
        port: 465,
        auth: {
          user: 'AKIAQULXDQMAZIFMY3PP',
          pass: 'BMHHPwYK8VYJbbPSgdxk6QI9aT8AoOR4WhsjlgSvW9II'
        },
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
  controllers: [MailController]
})
export class MailModule {}