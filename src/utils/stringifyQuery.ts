import type { RequestQuery } from "types";

export const stringifyQuery = (params?: RequestQuery): string => {
  if (!params) {
    return "";
  }

  return Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};
