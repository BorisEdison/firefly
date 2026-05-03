export const URL_CONSTANTS = {
  SHORT_ID_LENGTH: 7,

  CUSTOM_ALIAS: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
    PATTERN: /^[a-zA-Z0-9_-]+$/,
  },

  RESERVED_ALIASES: ["api", "health"],
};
