import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetModelDefinition } from './tweet.model';
import { TweetService } from './tweet.service';

@Module({
  imports: [MongooseModule.forFeature([TweetModelDefinition])],
  providers: [TweetService],
  exports: [TweetService],
})
export class TweetServiceModule {}
