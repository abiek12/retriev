export const createCacheKey = (
  resource: string,
  ...parts: string[]
): string => {
  return [resource, ...parts].join(":");
};
