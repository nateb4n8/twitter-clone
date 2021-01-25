import { Module } from '@nestjs/common';
import { FollowServiceModule } from 'src/follow/follow-service.module';
import { TweetServiceModule } from 'src/tweet/tweet-service.module';
import { UserServiceModule } from './user-service.module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [UserServiceModule, TweetServiceModule, FollowServiceModule],
  providers: [UserResolver],
})
export class UserModule {}
