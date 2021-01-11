import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/user/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { User } from 'src/user/user.model';
import { Follow } from './follow.model';
import { FollowService } from './follow.service';

@Resolver(() => Follow)
export class FollowResolver {
  constructor(private followService: FollowService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation((_returns) => Follow)
  async createFollow(
    @Args('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): Promise<Follow> {
    return this.followService.create(user.id, id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((_returns) => Follow)
  async deleteFollow(
    @Args('id', ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): Promise<Follow> {
    return this.followService.delete(user.id, id);
  }
}
