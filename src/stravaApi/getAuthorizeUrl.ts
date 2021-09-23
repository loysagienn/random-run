import { STRAVA_CLIENT_ID } from "config";
import { stringifyQuery } from "utils";
import type { AppContext } from "types";
import { STRAVA_AUTHORIZE_URL, SCOPES } from "./constants";

export const getAuthorizeUrl = (ctx: AppContext) => {
  const query = stringifyQuery({
    client_id: STRAVA_CLIENT_ID,
    redirect_uri: `${ctx.origin}/strava-oauth`,
    response_type: "code",
    scope: SCOPES.join(","),
    state: "default",
  });

  return `${STRAVA_AUTHORIZE_URL}?${query}`;
};
