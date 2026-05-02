import { randomBytes } from "node:crypto";

export const generateShortId = (length = 7): string => {
  return randomBytes(length).toString("base64url").slice(0, length);
};
