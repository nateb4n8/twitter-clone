import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

export type JwtPayload = {
  username: string;
  sub: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private userService: UserService;

  constructor(userService: UserService) {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'not_a_secret',
    };
    super(options);
    this.userService = userService;
  }

  async validate(payload: JwtPayload): Promise<Partial<User>> {
    const user = await this.userService.getById(payload.sub);
    if (user === null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
