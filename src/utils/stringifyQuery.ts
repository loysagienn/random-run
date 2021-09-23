type Params = {
  [key: string]: string | number;
};

export const stringifyQuery = (params: Params): string =>
  Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
