import { NotFoundException, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/user/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { CreateTweetInput } from './create-tweet.input';
import { Tweet } from './tweet.model';
import { TweetService } from './tweet.service';

@Resolver(() => Tweet)
export class TweetResolver {
  constructor(
    private tweetService: TweetService,
    private userService: UserService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation((_returns) => Tweet)
  createTweet(
    @Args('createTweetInput') createTweetInput: CreateTweetInput,
    @CurrentUser() user: User,
  ): Promise<Tweet> {
    return this.tweetService.create(createTweetInput, user.id);
  }

  @Query((_returns) => Tweet, { name: 'tweet' })
  async getTweet(@Args('id') id: string): Promise<Tweet> {
    const tweet = await this.tweetService.getById(id);
    if (tweet === null) {
      throw new NotFoundException(`Tweet id ${id} not found`);
    }
    return tweet;
  }

  @ResolveField('favoritedBy', (_returns) => [User])
  async getFavoritedBy(@Parent() tweet: Tweet): Promise<User[]> {
    return this.userService.getManyByIds(tweet.favoritedBy);
  }

  @ResolveField('author', (_returns) => User)
  async getAuthor(@Parent() tweet: Tweet): Promise<User> {
    return this.userService.getById(tweet.author);
  }
}
