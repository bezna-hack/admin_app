import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProposalModule } from './proposals/proposal.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StorageModule } from './storage/storage.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forRoot('mongodb+srv://eduardnicolescu:KkKdJ4u3VDh66ARb@cluster0.1lt3e9g.mongodb.net/?retryWrites=true&w=majority'),
    AuthModule,
    UserModule,
    ProposalModule,
    StorageModule,
    MailModule
  ],
  controllers: [UserController]
})
export class AppModule {}
