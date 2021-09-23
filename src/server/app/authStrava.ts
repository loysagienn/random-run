import { getAuthorizeUrl } from "stravaApi";
import type { AppContext, AppNext } from "types";
import { removeAthleteCredentials } from "./utils";

export const authStrava = async (ctx: AppContext, next: AppNext) => {
  if (ctx.state.route.path !== "/auth-strava") {
    return next();
  }

  ctx.redirect(getAuthorizeUrl(ctx));
};
