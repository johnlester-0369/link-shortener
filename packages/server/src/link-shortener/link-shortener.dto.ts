import {
  IsUrl,
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

// DTO for creating a new shortened link
// Extracted as standalone class to enable decorator usage (decorators don't work in static class properties)
export class CreateShortLinkDto {
  @IsUrl(
    { require_protocol: true },
    { message: 'Please provide a valid URL with http:// or https://' },
  )
  longUrl: string;

  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'Custom alias must be at least 3 characters long',
  })
  @MaxLength(50, {
    message: 'Custom alias must not exceed 50 characters',
  })
  @Matches(/^[a-zA-Z0-9-_]+$/, {
    message:
      'Custom alias can only contain letters, numbers, hyphens, and underscores',
  })
  customAlias?: string;
}

// DTO for shortened link response returned from API endpoints
export class ShortLinkResponseDto {
  shortCode: string;
  longUrl: string;
  shortUrl: string;
  createdAt: Date;
  clicks: number;
}

// DTO for validating short code URL parameters
export class ShortCodeParamDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-zA-Z0-9-_]+$/, {
    message: 'Invalid short code format',
  })
  shortCode: string;
}
