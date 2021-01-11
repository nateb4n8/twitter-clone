import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { Request } from 'express';
import { LoginUserInput } from 'src/auth/login-user.input';

@Injectable()
export class GqlLocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<ExpressContext>().req;
    const input: LoginUserInput = ctx.getArgs().loginUserInput;
    request.body = input;
    return request;
  }
}
