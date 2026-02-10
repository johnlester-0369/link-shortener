import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Res,
  HttpStatus,
  Ip,
} from '@nestjs/common';
import type { Response } from 'express';
import { LinkShortenerService } from './link-shortener.service';
import {
  CreateShortLinkDto,
  ShortLinkResponseDto,
  ShortCodeParamDto,
} from './link-shortener.dto';

// REST controller providing link shortening and redirection endpoints
// Matches LinkShortenerForm.tsx requirements (POST for creation, GET for redirect)
@Controller()
export class LinkShortenerController {
  constructor(private readonly linkShortenerService: LinkShortenerService) {}

  // POST /shorten - Creates new shortened link
  // Accepts: { longUrl: string, customAlias?: string }
  // Returns: { shortCode, longUrl, shortUrl, createdAt, clicks }
  @Post('shorten')
  async createShortLink(
    @Body() createDto: CreateShortLinkDto,
    @Ip() ip: string,
  ): Promise<ShortLinkResponseDto> {
    return this.linkShortenerService.createShortLink(createDto, ip);
  }

  // GET /:shortCode - Redirects to original long URL
  // Increments click counter and performs 302 redirect
  @Get(':shortCode')
  async redirect(
    @Param() params: ShortCodeParamDto,
    @Res() res: Response,
  ): Promise<void> {
    const longUrl = await this.linkShortenerService.getLongUrl(
      params.shortCode,
    );

    // 302 temporary redirect preserves search engine ranking of original URL
    res.redirect(HttpStatus.FOUND, longUrl);
  }

  // GET /api/links/:shortCode - Retrieves link details (for analytics/management)
  // Returns full short link information without redirect
  @Get('api/links/:shortCode')
  async getLinkDetails(
    @Param() params: ShortCodeParamDto,
  ): Promise<ShortLinkResponseDto> {
    return this.linkShortenerService.getShortLinkDetails(params.shortCode);
  }
}
