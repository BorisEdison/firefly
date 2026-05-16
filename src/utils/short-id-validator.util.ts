import { URL_CONSTANTS } from "../constants/url.constants.js";

export const isValidShortIdLength = (shortId: string): boolean => {
  return (
    shortId.length >= URL_CONSTANTS.CUSTOM_ALIAS.MIN_LENGTH &&
    shortId.length <= URL_CONSTANTS.CUSTOM_ALIAS.MAX_LENGTH
  );
};

export const isValidShortId = (shortd: string): boolean => {
  return URL_CONSTANTS.CUSTOM_ALIAS.PATTERN.test(shortd);
};
