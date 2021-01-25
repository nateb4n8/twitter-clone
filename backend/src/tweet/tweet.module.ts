import { Module } from '@nestjs/common';
import { UserServiceModule } from 'src/user/user-service.module';
import { TweetServiceModule } from './tweet-service.module';
import { TweetResolver } from './tweet.resolver';

@Module({
  imports: [TweetServiceModule, UserServiceModule],
  providers: [TweetResolver],
})
export class TweetModule {}
