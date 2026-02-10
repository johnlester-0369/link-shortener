
/**
 * useLinkShortener Hook
 *
 * React hook for link shortening with validation.
 * Combines validators + service for form usage.
 *
 * @module hooks/useLinkShortener
 */

import { useState, useCallback } from 'react'
import {
  linkShortenerService,
  type CreateShortLinkRequest,
  type ShortLinkResponse,
} from '@/services/link-shortener.service'
import { validateCreateShortLink, sanitize } from '@/validators'

/**
 * Hook options for callbacks.
 */
interface UseLinkShortenerOptions {
  onSuccess?: (message: string, link: ShortLinkResponse) => void
  onError?: (message: string) => void
}

/**
 * Hook return type.
 */
interface UseLinkShortenerReturn {
  isSubmitting: boolean
  createShortLink: (
    input: CreateShortLinkRequest,
  ) => Promise<ShortLinkResponse | null>
}

/**
 * Custom hook for creating short links with validation.
 * Validates input with Zod before calling API to reduce server load.
 *
 * @param options - Callback handlers for success/error
 * @returns Hook methods and state
 *
 * @example
 * ```tsx
 * const { createShortLink, isSubmitting } = useLinkShortener({
 *   onSuccess: (message, link) => {
 *     setShortUrl(link.shortUrl)
 *     setError('')
 *   },
 *   onError: (message) => {
 *     setError(message)
 *     setShortUrl('')
 *   }
 * })
 *
 * // In form submit handler
 * const link = await createShortLink({
 *   longUrl: 'https://example.com',
 *   customAlias: 'my-link'
 * })
 * ```
 */
export function useLinkShortener(
  options: UseLinkShortenerOptions = {},
): UseLinkShortenerReturn {
  const { onSuccess, onError } = options
  const [isSubmitting, setIsSubmitting] = useState(false)

  /**
   * Creates a short link with Zod validation.
   * Sanitizes longUrl to prevent XSS attacks.
   */
  const createShortLink = useCallback(
    async (
      input: CreateShortLinkRequest,
    ): Promise<ShortLinkResponse | null> => {
      // Validate using Zod schema
      const validation = validateCreateShortLink({
        longUrl: input.longUrl,
        customAlias: input.customAlias,
      })

      if (!validation.success) {
        onError?.(validation.error ?? 'Validation failed')
        return null
      }

      setIsSubmitting(true)
      try {
        const link = await linkShortenerService.createShortLink({
          longUrl: sanitize(input.longUrl),
          customAlias: input.customAlias
            ? sanitize(input.customAlias)
            : undefined,
        })

        onSuccess?.('Link shortened successfully', link)
        return link
      } catch (err: unknown) {
        console.error('Error creating short link:', err)
        const errorMessage =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message ?? 'Failed to create short link. Please try again.'
        onError?.(errorMessage)
        return null
      } finally {
        setIsSubmitting(false)
      }
    },
    [onSuccess, onError],
  )

  return {
    isSubmitting,
    createShortLink,
  }
}
