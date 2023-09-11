import { 
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Patch,
  Delete
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  getUser(@Request() req) {
    return this.userService.findOneById(req.body._id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('find-one')
  getByUsername(@Request() req) {
    return this.userService.findOne({ username: req.body.username })
  }

  @UseGuards(JwtAuthGuard)
  @Get('all-users')
  getAllUsers() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post('create')
  createUser(@Request() req){
    return this.userService.create(req.body)
  }
  
  @UseGuards(JwtAuthGuard)
  @Patch('update')
  updateUser(@Request() req) {
    return this.userService.update(req.body._id, req.body)
    
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  deleteUser(@Request() req) {
    return this.userService.delete(req.body._id)
  }

  // this endpoint is working without any auth for dev purposes; should be left out of prod builds
  @Post('dev/create')
  createUserDev(@Request() req){
    return this.userService.create(req.body)
  }
}