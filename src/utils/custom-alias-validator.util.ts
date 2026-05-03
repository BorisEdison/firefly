import { URL_CONSTANTS } from "../constants/url.constants.js";

export const isValidCustomAlias = (customAlias: string): boolean => {
  return URL_CONSTANTS.CUSTOM_ALIAS.PATTERN.test(customAlias);
};

export const isValidCustomAliasLength = (customAlias: string): boolean => {
  return (
    customAlias.length >= URL_CONSTANTS.CUSTOM_ALIAS.MIN_LENGTH &&
    customAlias.length <= URL_CONSTANTS.CUSTOM_ALIAS.MAX_LENGTH
  );
};

export const isReservedCustomAlias = (customAlias: string): boolean => {
  return URL_CONSTANTS.RESERVED_ALIASES.includes(customAlias.toLowerCase());
};
