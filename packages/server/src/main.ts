import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import './lib/firebase'; // Initialize Firebase Admin SDK before app starts

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS to allow web client from different origin (localhost:3001, etc.)
  // Prevents browser CORS errors when web app calls API
  app.enableCors({
    origin: true, // Allow all origins in development (configure for production)
    credentials: true,
  });

  // Global validation pipe enforces DTO validation on all endpoints
  // Rejects invalid requests before reaching controllers
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties not defined in DTO
      forbidNonWhitelisted: true, // Throw error if extra properties sent
      transform: true, // Auto-transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Convert string "123" to number 123
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3005);
}

void bootstrap();
