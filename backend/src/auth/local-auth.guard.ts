import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { Request } from 'express';

@Injectable()
export class GqlLocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<ExpressContext>().req;
    const { username, password } = ctx.getArgs();
    request.body = { username, password };
    return request;
  }
}
