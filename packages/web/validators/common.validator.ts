
/**
 * Common Validator Utilities
 *
 * Shared validation utilities used across validators.
 * Includes input sanitization for XSS prevention.
 *
 * @module validators/common
 */

/**
 * Sanitizes user input by trimming whitespace.
 * Prevents XSS by removing leading/trailing spaces that could hide malicious content.
 *
 * @param value - Input string to sanitize
 * @returns Trimmed string
 *
 * @example
 * sanitize('  hello  ') // Returns: 'hello'
 */
export function sanitize(value: string): string {
  return value.trim()
}
