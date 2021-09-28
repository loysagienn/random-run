import type { Method, RequestQuery, RequestBody } from "types";
import { stringifyQuery, RunError } from "utils";

type RequestOptions = {
  method?: Method;
  path: string;
  query?: RequestQuery;
  body?: RequestBody;
};

export const request = async <TResult = any>({
  path,
  method,
  query,
  body,
}: RequestOptions): Promise<TResult> => {
  const queryString = stringifyQuery(query);
  const url = queryString ? `${path}?${queryString}` : path;
  const options: RequestInit = { credentials: "include", headers: {} };

  if (method) {
    options.method = method;
  }

  if (body) {
    options.body = JSON.stringify(body);
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json;charset=utf-8",
    };
  }

  const response = await fetch(url, options);

  if (response.ok && response.status === 200) {
    return response.json();
  }

  let error;
  let text: string | null = null;
  let responseBody: any = null;

  try {
    text = await response.text();
  } catch (err) {
    error = err;
  }

  if (text) {
    try {
      responseBody = JSON.parse(text);
    } catch (err) {
      error = err;
    }
  }

  if (responseBody && responseBody.error) {
    throw new RunError(responseBody.error.code, {
      message: responseBody.error.message || "Unknown error",
      statusCode: response.status || responseBody.error.statusCode,
    });
  }

  if (text) {
    throw new RunError("request_text_error", {
      message: text || "Request error",
      statusCode: response.status,
    });
  }

  throw new RunError("request_parse_unknown_error", {
    message: "Unknown error",
    statusCode: response.status,
    error,
  });
};
