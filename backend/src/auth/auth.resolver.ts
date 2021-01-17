import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginUserInput } from 'src/auth/login-user.input';
import { User } from 'src/user/user.model';
import { CreateUserInput } from 'src/user/create-user.input';
import { AuthService } from './auth.service';
import { CurrentUser } from '../user/current-user.decorator';
import { GqlLocalAuthGuard } from './local-auth.guard';
import { Login } from './login.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(GqlLocalAuthGuard)
  @Mutation(() => Login)
  login(
    @Args('loginUserInput') _loginUserInput: LoginUserInput,
    @CurrentUser() user: User,
  ): Login {
    const loginOutput = new Login();
    loginOutput.accessToken = this.authService.getAccessToken(user.id);
    loginOutput.user = user;
    return loginOutput;
  }

  @Mutation(() => Login)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<Login> {
    return this.authService.createLogin(createUserInput);
  }
}
