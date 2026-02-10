import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinkShortenerModule } from './link-shortener/link-shortener.module';
import { envConfig, validateEnvConfig } from './config/env.config';

// Validate environment variables before application starts
// Prevents runtime errors from missing configuration
validateEnvConfig();

@Module({
  imports: [
    // Global configuration module with type-safe env access
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available everywhere without re-importing
      load: [envConfig], // Loads custom environment configuration factory
      envFilePath: '.env', // Specifies .env file location
    }),
    LinkShortenerModule, // Registers link shortener feature module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
