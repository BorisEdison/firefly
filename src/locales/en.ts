export const en = {
  SERVER: {
    RUNNING: "Server is running",
  },

  PROCESS: {
    STARTUP_FAILED: "Application startup failed",
    SIGINT_RECEIVED: "SIGNINT received. Shutting down gracefully...",
    SIGTERM_RECEIVED: "SIGTERM received. Shutting down gracefully...",
    HTTP_SERVER_CLOSED: "HTTP server closed",
    SHUTDOWN_COMPLETED: "Shutdown completed",
    SHUTDOWN_ERROR: "Error during shutdown",
  },

  DATABASE: {
    CONNECTED: "MongoDB connected successfully",
    CONNECTION_FAILED: "MongoDB connection failed",
    MONGO_URI_REQUIRED: "MONGO_URI is required",
    DISCONNECTED: "MongoDB disconnected successfully",
  },

  REDIS: {
    CONNECTED: "Redis connected successfully",
    CONNECTION_FAILED: "Redis connection failed. Cache will be disabled",
    REDIS_URL_REQUIRED: "REDIS_URL is required",
    DISCONNECTED: "Redis disconnected successfully",
  },

  URL: {
    CREATED: "Short URL created successfully",
    ANALYTICS_FETCHED: "URL analytics fetched successfully",
    INVALID_ORIGINAL_URL: "A valid URL is required",
    CUSTOM_ALIAS_ALREADY_EXISTS: "Custom alias already exists",
    CUSTOM_ALIAS_INVALID:
      "Custom alias can only contain letters, numbers, hyphens, and underscores",
    CUSTOM_ALIAS_LENGTH_INVALID:
      "Custom alias must be between 3 and 30 characters",
    CUSTOM_ALIAS_RESERVED: "This custom alias is reserved",
    INVALID_SHORT_ID:
      "Short ID can only contain letters, numbers, hyphens, and underscores",
    SHORT_ID_LENGTH_INVALID: 
      "Short ID must be between 3 and 30 characters",
    INVALID_EXPIRY_DATE: "Expiry date must be a valid date",
    EXPIRY_DATE_IN_PAST: "Expiry date must be in the future",
    SHORT_ID_GENERATION_FAILED:
      "Could not generate a unique short URL. Please try again",
    BASE_URL_REQUIRED: "BASE_URL is required",
    NOT_FOUND: "Short URL not found",
    EXPIRED: "Short URL has expired",
  },

  ROUTE: {
    NOT_FOUND: "Route not found",
  },

  RATE_LIMIT: {
    TOO_MANY_REQUESTS: "Too many requests. Please try again later",
  },

  ERROR: {
    INTERNAL_SERVER_ERROR: "Internal server error",
  },
};
