import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendEmail(email: string, message: string): Promise<void>;
}
