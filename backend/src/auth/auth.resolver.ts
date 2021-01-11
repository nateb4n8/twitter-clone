import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginUserInput } from 'src/auth/login-user.input';
import { User } from 'src/user/user.model';
import { AuthService } from './auth.service';
import { CurrentUser } from '../user/current-user.decorator';
import { GqlLocalAuthGuard } from './local-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(GqlLocalAuthGuard)
  @Mutation(() => String)
  login(
    @Args('loginUserInput') _loginUserInput: LoginUserInput,
    @CurrentUser() user: User,
  ): string {
    return this.authService.getAccessToken(user.id);
  }
}
