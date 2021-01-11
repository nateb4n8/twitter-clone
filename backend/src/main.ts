import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './config/app-config.service';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const { port, environment } = app.get(AppConfigService).server;
  logger.verbose(`App environment: ${environment}`);
  if (environment === 'development') {
    logger.verbose(`CORS enabled`);
    app.enableCors();
  }

  await app.listen(port);
  logger.log(
    `Graphql playground available at http://localhost:${port}/graphql`,
  );
}
bootstrap();
