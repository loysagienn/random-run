import { AppContext, AppNext } from "types";
import { RunError } from "utils";

export const errorHandler = async (ctx: AppContext, next: AppNext) => {
  try {
    return await next();
  } catch (error) {
    if (error instanceof RunError) {
      ctx.status = error.statusCode || 500;

      ctx.body = {
        error,
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        error: new RunError("request_unknown_error", {
          message: "Unknown server error",
          statusCode: 500,
          error,
        }),
      };
    }
  }
};
