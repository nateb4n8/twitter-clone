import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from 'src/user/create-user.input';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { Login } from './login.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userService.getByUsername(username);
    if (user === null) return null;

    const { password, ...rest } = user.toObject();
    const match = await bcrypt.compare(pass, password);
    return match ? rest : null;
  }

  getAccessToken(userId: string): string {
    const payload = { sub: userId };
    return this.jwtService.sign(payload);
  }

  async createLogin(createUserInput: CreateUserInput): Promise<Login> {
    const login = new Login();
    login.user = await this.userService.create(createUserInput);
    login.accessToken = this.getAccessToken(login.user.id);
    return login;
  }
}
