
/**
 * Link Shortener Service
 *
 * API service for link shortening operations.
 * Encapsulates HTTP communication with the backend.
 *
 * @module services/link-shortener
 */

import apiClient from '@/lib/api-client'
import type {
  CreateShortLinkRequest,
  ShortLinkResponse,
} from '@/dto/link-shortener.dto'

/**
 * Link Shortener API Service
 *
 * Provides methods for creating and managing short links.
 * Uses centralized API client for HTTP communication.
 */
class LinkShortenerService {
  private readonly baseUrl = '/shorten'

  /**
   * Creates a new short link.
   * Sends request to POST /shorten endpoint.
   *
   * @param data - Link creation data (longUrl, optional customAlias)
   * @param signal - AbortSignal for request cancellation
   * @returns Created short link with full details
   * @throws ApiError if request fails (handled by apiClient)
   *
   * @example
   * ```tsx
   * const link = await linkShortenerService.createShortLink({
   *   longUrl: 'https://example.com/very/long/url',
   *   customAlias: 'my-link'
   * })
   *
   * console.log(link.shortUrl) // 'http://localhost:3005/my-link'
   * ```
   */
  async createShortLink(
    data: CreateShortLinkRequest,
    signal?: AbortSignal,
  ): Promise<ShortLinkResponse> {
    try {
      const response = await apiClient.post<ShortLinkResponse>(
        this.baseUrl,
        data,
        { signal },
      )
      return response.data
    } catch (error) {
      console.error('Failed to create short link:', error)
      throw error
    }
  }
}

/**
 * Singleton service instance.
 * Import and use throughout the application.
 */
export const linkShortenerService = new LinkShortenerService()

/**
 * Re-export types for convenience.
 */
export type {
  CreateShortLinkRequest,
  ShortLinkResponse,
} from '@/dto/link-shortener.dto'
