
// Centralized configuration with runtime validation
// Prevents application startup with missing critical environment variables

interface AppConfig {
  apiBaseUrl: string
}

// Validates required environment variables at module load time
// Throws immediately if config is missing rather than failing at API call time
function getConfig(): AppConfig {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  if (!apiBaseUrl) {
    throw new Error(
      'NEXT_PUBLIC_API_BASE_URL environment variable is not defined. ' +
        'Please check your .env.local file and ensure it contains this variable.'
    )
  }

  return {
    apiBaseUrl,
  }
}

export const config = getConfig()
