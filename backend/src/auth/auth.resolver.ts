import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from 'src/user/user.model';
import { CurrentUser } from '../user/current-user.decorator';
import { AuthService } from './auth.service';
import { GqlLocalAuthGuard } from './local-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(GqlLocalAuthGuard)
  @Mutation(() => String)
  login(
    @Args('username') username: string,
    @Args('password') password: string,
    @CurrentUser() user: User,
  ): string {
    return this.authService.getAccessToken(user.id);
  }
}
