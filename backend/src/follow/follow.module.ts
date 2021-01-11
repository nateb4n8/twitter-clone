import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowModelDefinition } from './follow.model';
import { FollowResolver } from './follow.resolver';
import { FollowService } from './follow.service';

@Module({
  imports: [MongooseModule.forFeature([FollowModelDefinition])],
  providers: [FollowService, FollowResolver],
  exports: [FollowService],
})
export class FollowModule {}
