export const parseFutureDate = (value?: string): Date | undefined => {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date;
};

export const isFutureDate = (date: Date): boolean => {
  return date.getTime() > Date.now();
};
