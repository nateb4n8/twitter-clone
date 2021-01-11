import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ServerConfig } from './server.config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get server(): ServerConfig {
    return this.configService.get<ServerConfig>('server');
  }

  get mongoose(): MongooseModuleOptions {
    return this.configService.get<MongooseModuleOptions>('mongoose');
  }

  get jwt(): JwtModuleOptions {
    return this.configService.get<JwtModuleOptions>('jwt');
  }
}
