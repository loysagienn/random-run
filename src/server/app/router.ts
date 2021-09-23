import { AppContext, AppNext, Route } from "types";

export async function router(ctx: AppContext, next: AppNext) {
  const path = ctx.path;

  const route: Route = { path };

  ctx.state.route = route;

  return next();
}
