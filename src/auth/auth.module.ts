import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AsyncLocalStorage } from 'async_hooks';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RolesGuard } from './guards/roles.guard';
import { jwtConstants } from './constants';
import { User, UserSchema } from 'src/user/user.schema'; 
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PassportModule,
    JwtModule.register({
      // secret: process.env.JWT_SECRET,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' }
    }),
    MongooseModule.forFeature([{ 
      name: User.name,
      schema: UserSchema
    }])
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    AsyncLocalStorage,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
  exports: [AuthService],
})
export class AuthModule {}