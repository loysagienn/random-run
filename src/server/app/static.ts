import send from "koa-send";
import path from "path";
import { ROOT } from "config";
import { AppContext, AppNext } from "types";

export async function sendStatic(ctx: AppContext, next: AppNext) {
  if (!ctx.path.startsWith("/static")) {
    return next();
  }

  const filePath = ctx.path.replace(/^\/static[/]*/, "");
  const root = path.resolve(ROOT, "public");

  return send(ctx, filePath, { root });
}
