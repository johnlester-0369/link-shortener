import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LinkShortenerRepository } from './link-shortener.repo';
import { ShortLink } from '../lib/db';
import { CreateShortLinkDto, ShortLinkResponseDto } from './link-shortener.dto';

@Injectable()
export class LinkShortenerService {
  constructor(
    private readonly repository: LinkShortenerRepository,
    private readonly configService: ConfigService,
  ) {}

  // Creates shortened link with auto-generated or custom short code
  // Throws ConflictException if custom alias already exists
  async createShortLink(
    createDto: CreateShortLinkDto,
    creatorIp?: string,
  ): Promise<ShortLinkResponseDto> {
    const shortCode = createDto.customAlias || this.generateShortCode();

    // Verify custom alias isn't already taken
    const existing = await this.repository.findByShortCode(shortCode);
    if (existing) {
      throw new ConflictException(
        `Short code "${shortCode}" is already in use. Please choose another alias.`,
      );
    }

    const shortLink: ShortLink = {
      longUrl: createDto.longUrl,
      shortCode,
      createdAt: new Date(),
      clicks: 0,
      creatorIp,
    };

    const created = await this.repository.create(shortLink);

    return this.buildResponse(created);
  }

  // Retrieves original URL by short code and increments click counter
  // Throws NotFoundException if short code doesn't exist
  async getLongUrl(shortCode: string): Promise<string> {
    const shortLink = await this.repository.findByShortCode(shortCode);

    if (!shortLink) {
      throw new NotFoundException(
        `Short link "${shortCode}" not found. Please check the URL and try again.`,
      );
    }

    // Track click asynchronously to avoid blocking redirect
    this.repository.incrementClicks(shortCode).catch((err) => {
      console.error('Failed to increment clicks:', err);
    });

    return shortLink.longUrl;
  }

  // Retrieves full short link details by short code
  // Used for analytics or link management endpoints
  async getShortLinkDetails(shortCode: string): Promise<ShortLinkResponseDto> {
    const shortLink = await this.repository.findByShortCode(shortCode);

    if (!shortLink) {
      throw new NotFoundException(`Short link "${shortCode}" not found.`);
    }

    return this.buildResponse(shortLink);
  }

  // Generates random 6-character short code using base36 encoding
  // Provides ~2 billion unique combinations (36^6)
  private generateShortCode(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  // Constructs full shortened URL using LINK_SHORTENER_URL from environment
  // Example: "http://localhost:3000" + "/" + "abc123" = "http://localhost:3000/abc123"
  private buildResponse(shortLink: ShortLink): ShortLinkResponseDto {
    const baseUrl = this.configService.get<string>('env.linkShortener.url');

    return {
      shortCode: shortLink.shortCode,
      longUrl: shortLink.longUrl,
      shortUrl: `${baseUrl}/${shortLink.shortCode}`,
      createdAt: shortLink.createdAt,
      clicks: shortLink.clicks,
    };
  }
}
