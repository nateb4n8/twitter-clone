import { Module } from '@nestjs/common';
import { FollowServiceModule } from './follow-service.module';
import { FollowResolver } from './follow.resolver';

@Module({
  imports: [FollowServiceModule],
  providers: [FollowResolver],
})
export class FollowModule {}
