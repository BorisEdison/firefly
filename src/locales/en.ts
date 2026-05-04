export const en = {
  SERVER: {
    RUNNING: "Server is running",
  },
  DATABASE: {
    CONNECTED: "MongoDB connected successfully",
    CONNECTION_FAILED: "MongoDB connection failed",
    MONGO_URI_REQUIRED: "MONGO_URI is required",
  },

  REDIS: {
    CONNECTED: "Redis connected successfully",
    CONNECTION_FAILED: "Redis connection failed. Cache will be disabled",
    REDIS_URL_REQUIRED: "REDIS_URL is required",
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
  
  ERROR: {
    INTERNAL_SERVER_ERROR: "Internal server error",
  },
};
