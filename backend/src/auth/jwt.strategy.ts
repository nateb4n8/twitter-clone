import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';

export type JwtPayload = {
  username: string;
  sub: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'not_a_secret',
    });
  }

  async validate(payload: JwtPayload): Promise<Partial<User>> {
    const user = await this.userService.getById(payload.sub);
    if (user === null) {
      throw new UnauthorizedException();
    }
    const { password, ...rest } = user.toObject();
    return rest;
  }
}
