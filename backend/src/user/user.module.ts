import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { FollowModelDefinition } from 'src/follow/follow.model';
import { FollowService } from 'src/follow/follow.service';
import { TweetModelDefinition } from 'src/tweet/tweet.model';
import { TweetService } from 'src/tweet/tweet.service';
import { UserModelDefinition } from './user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      UserModelDefinition,
      TweetModelDefinition,
      FollowModelDefinition,
    ]),
  ],
  providers: [UserService, UserResolver, TweetService, FollowService],
  exports: [UserService],
})
export class UserModule {}
