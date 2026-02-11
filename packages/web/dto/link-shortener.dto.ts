
/**
 * Link Shortener DTO Definitions
 *
 * Type definitions matching server API contracts.
 * Ensures type safety for API requests and responses.
 *
 * @module dto/link-shortener
 */

/**
 * Request payload for creating a short link.
 * Matches CreateShortLinkDto from server.
 */
export interface CreateShortLinkRequest {
  longUrl: string
  customAlias?: string
}

/**
 * Response from creating a short link.
 * Matches ShortLinkResponseDto from server.
 */
export interface ShortLinkResponse {
  shortCode: string
  longUrl: string
  shortUrl: string
  createdAt: Date
  clicks: number
}
