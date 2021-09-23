import { AppContext, AppNext } from "types";
import { renderHtml } from "./renderHtml";

export async function html(ctx: AppContext) {
  ctx.body = renderHtml(ctx);
}
