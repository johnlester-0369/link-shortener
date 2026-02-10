import { schema, Typesaurus } from 'typesaurus';

// Centralized Typesaurus database schema definition
// Single source of truth for all Firestore collections and their types
export const db = schema(($) => ({
  // shortLinks collection stores URL mappings with metadata
  shortLinks: $.collection<ShortLink>(),
}));

// Type helper for accessing schema types throughout the application
// Enables type inference in services and repositories
export type Schema = Typesaurus.Schema<typeof db>;

// ShortLink document model
// Matches requirements from LinkShortenerForm.tsx (longUrl, optional customAlias)
export interface ShortLink {
  // Original long URL to redirect to
  longUrl: string;

  // Short code (auto-generated or custom alias from user)
  // Used in URL path: /{shortCode}
  shortCode: string;

  // Creation timestamp for analytics and cleanup
  createdAt: Date;

  // Click tracking for analytics (initialized to 0)
  clicks: number;

  // Optional: IP address of creator for abuse prevention
  creatorIp?: string;
}
