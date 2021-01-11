import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { serverConfig } from './server.config';
import { mongooseConfig } from './mongoose.config';
import { jwtConfig } from './jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [serverConfig, mongooseConfig, jwtConfig] }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
