import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(username: string, plainPass: string): Promise<any> {
    const response: any = await this.userService.findOne({username: username})
    const user: any = response[0]
    if (user) {
      const res = bcrypt.compareSync(plainPass, user.password)
      if(res){
        return user
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
