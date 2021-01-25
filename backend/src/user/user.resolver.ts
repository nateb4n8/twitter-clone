import { ConflictException, NotFoundException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FollowService } from 'src/follow/follow.service';
import { Tweet } from 'src/tweet/tweet.model';
import { TweetService } from 'src/tweet/tweet.service';
import { CreateUserInput } from './create-user.input';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private tweetService: TweetService,
    private followService: FollowService,
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<Partial<User>> {
    const user = await this.userService.getByUsername(createUserInput.username);
    if (user !== null) {
      throw new ConflictException('Username already exist');
    }

    return this.userService.create(createUserInput);
  }

  @Query((_returns) => User, { name: 'user' })
  async getUser(@Args('username') username: string): Promise<User> {
    const user = await this.userService.getByUsername(username);
    if (user === null) {
      throw new NotFoundException(`Username ${username} not found`);
    }
    return user;
  }

  @ResolveField('followers', (_returns) => [User])
  async getFollowers(@Parent() user: User): Promise<User[]> {
    return this.followService.getFollowers(user.id);
  }

  @ResolveField('following', (_returns) => [User])
  async getFollowing(@Parent() user: User): Promise<User[]> {
    return this.followService.getFollowing(user.id);
  }

  @ResolveField('followingCount', (_returns) => Number)
  async getFollowingCount(@Parent() user: User): Promise<number> {
    return this.followService.getFollowingCount(user.id);
  }

  @ResolveField('followerCount', (_returns) => Number)
  async getFollowersCount(@Parent() user: User): Promise<number> {
    return this.followService.getFollowerCount(user.id);
  }

  @ResolveField('tweetCount', (_returns) => Number)
  getTweetCount(@Parent() user: User): Promise<number> {
    return this.tweetService.getCountByAuthor(user.id);
  }

  @ResolveField('tweets', (_returns) => [Tweet])
  async getTweets(@Parent() user: User): Promise<Tweet[]> {
    return this.tweetService.getByAuthor(user.id);
  }
}
