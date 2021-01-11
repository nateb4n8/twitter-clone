import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelDefinition } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { TweetModelDefinition } from './tweet.model';
import { TweetResolver } from './tweet.resolver';
import { TweetService } from './tweet.service';

@Module({
  imports: [
    MongooseModule.forFeature([TweetModelDefinition, UserModelDefinition]),
  ],
  providers: [TweetService, TweetResolver, UserService],
  exports: [TweetService],
})
export class TweetModule {}
