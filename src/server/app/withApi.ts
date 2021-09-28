import { AppContext, AppNext } from "types";

import { initApi } from "server/api";

export async function withApi(ctx: AppContext, next: AppNext) {
  ctx.state.api = initApi(ctx);

  return next();
}
