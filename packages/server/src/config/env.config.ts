import 'dotenv/config'; // Load .env file into process.env at startup
import { registerAs } from '@nestjs/config';

// Type-safe environment configuration factory
// Validates required variables at startup to prevent runtime errors
export const envConfig = registerAs('env', () => ({
  firebase: {
    // Base64-encoded service account prevents credential files in version control
    serviceAccountKey: process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
  },
  linkShortener: {
    // Prefix for constructing full shortened URLs (e.g., "https://lnk.sh")
    // Stored in env to support different domains per environment (dev/staging/prod)
    url: process.env.LINK_SHORTENER_URL || 'http://localhost:3000',
  },
}));

// Validates critical environment variables at application startup
// Throws immediately if config is missing rather than failing at runtime
export function validateEnvConfig() {
  const required = {
    FIREBASE_SERVICE_ACCOUNT_KEY: process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
    LINK_SHORTENER_URL: process.env.LINK_SHORTENER_URL,
  };

  const missing = Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`,
    );
  }
}
