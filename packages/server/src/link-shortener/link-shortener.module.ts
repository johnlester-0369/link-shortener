import { Module } from '@nestjs/common';
import { LinkShortenerController } from './link-shortener.controller';
import { LinkShortenerService } from './link-shortener.service';
import { LinkShortenerRepository } from './link-shortener.repo';
import { IsAliasUniqueConstraint } from './link-shortener.validator';

// Feature module encapsulating all link shortener functionality
// Follows NestJS modular architecture for code organization and dependency management
@Module({
  controllers: [LinkShortenerController],
  providers: [
    LinkShortenerService,
    LinkShortenerRepository,
    IsAliasUniqueConstraint,
  ],
  exports: [LinkShortenerService], // Exports service for potential use in other modules
})
export class LinkShortenerModule {}
