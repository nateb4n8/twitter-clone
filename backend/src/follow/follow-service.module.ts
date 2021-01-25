import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowModelDefinition } from './follow.model';
import { FollowService } from './follow.service';

@Module({
  imports: [MongooseModule.forFeature([FollowModelDefinition])],
  providers: [FollowService],
  exports: [FollowService],
})
export class FollowServiceModule {}
