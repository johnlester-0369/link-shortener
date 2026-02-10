
/**
 * Link Shortener Validators
 *
 * Zod-based validation schemas for link shortener operations.
 * Validates input before API calls to reduce server load and provide immediate feedback.
 *
 * @module validators/link-shortener
 */

import { z } from 'zod'

/**
 * Validation result type returned by all validators.
 */
export interface ValidationResult<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

/**
 * Schema for creating a short link.
 * Matches server-side CreateShortLinkDto validation rules.
 */
const createShortLinkSchema = z.object({
  longUrl: z
    .string()
    .url({ message: 'Please provide a valid URL with http:// or https://' })
    .min(1, { message: 'URL is required' }),
  customAlias: z
    .string()
    .min(3, { message: 'Custom alias must be at least 3 characters long' })
    .max(50, { message: 'Custom alias must not exceed 50 characters' })
    .regex(/^[a-zA-Z0-9-_]+$/, {
      message:
        'Custom alias can only contain letters, numbers, hyphens, and underscores',
    })
    .optional(),
})

/**
 * Input type for creating a short link.
 */
export type CreateShortLinkInput = z.infer<typeof createShortLinkSchema>

/**
 * Validates input for creating a short link.
 * Ensures URL is valid and custom alias meets requirements before API call.
 *
 * @param input - Data to validate
 * @returns Validation result with typed data or error message
 *
 * @example
 * ```tsx
 * const result = validateCreateShortLink({
 *   longUrl: 'https://example.com',
 *   customAlias: 'my-link'
 * })
 *
 * if (result.success) {
 *   // result.data is typed CreateShortLinkInput
 *   await api.createShortLink(result.data)
 * } else {
 *   // Show result.error to user
 * }
 * ```
 */
export function validateCreateShortLink(
  input: CreateShortLinkInput,
): ValidationResult<CreateShortLinkInput> {
  const result = createShortLinkSchema.safeParse(input)

  if (!result.success) {
    // Extract first error message for user-friendly feedback
    const firstError = result.error.errors[0]
    return {
      success: false,
      error: firstError?.message ?? 'Validation failed',
    }
  }

  return {
    success: true,
    data: result.data,
  }
}
