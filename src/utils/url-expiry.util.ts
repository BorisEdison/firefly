export const isExpiredDate = (expiresAt?: Date | string): boolean => {
  if (!expiresAt) {
    return false;
  }

  const expiryDate =
    expiresAt instanceof Date ? expiresAt : new Date(expiresAt);

  if (Number.isNaN(expiryDate.getTime())) {
    return true;
  }

  return expiryDate.getTime() <= Date.now();
};
