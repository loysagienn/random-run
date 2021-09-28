import type { AppContext, AppNext } from "types";
import { createParty } from "./createParty";

export const api = async (ctx: AppContext, next: AppNext) => {
  if (!ctx.state.route.path.startsWith("/api/")) {
    return next();
  }

  if (ctx.state.route.path === "/api/party" && ctx.method === "POST") {
    return createParty(ctx);
  }

  ctx.status = 404;
  ctx.body = {
    error: {
      message: "Not found",
    },
  };
};
