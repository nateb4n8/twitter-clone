import { registerAs } from '@nestjs/config';
import 'dotenv';

export interface ServerConfig {
  port: string | number;
  environment: string;
}

export const serverConfig = registerAs(
  'server',
  (): ServerConfig => ({
    port: process.env.PORT || 3001,
    environment: process.env.NODE_ENV || 'development',
  }),
);
