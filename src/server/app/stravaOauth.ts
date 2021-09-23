import { getOauthToken } from "stravaApi";
import type {
  AppContext,
  AppNext,
  StravaScope,
  StravaCredentials,
} from "types";

const getScopes = (scopeStr: any): StravaScope[] => {
  if (!scopeStr) {
    return [];
  }

  if (typeof scopeStr !== "string") {
    return [];
  }

  return scopeStr.split(",") as StravaScope[];
};

const getCode = (codeStr: any): string => {
  if (!codeStr) {
    return "";
  }

  if (typeof codeStr !== "string") {
    return "";
  }

  return codeStr;
};

const auth = async (ctx: AppContext): Promise<StravaCredentials> => {
  const { session } = ctx.state;

  const scopes = getScopes(ctx.query.scope);

  const { credentials, athleteId } = await getOauthToken(
    getCode(ctx.query.code)
  );

  const newSession = { ...session, athleteId };

  await Promise.all([
    ctx.db.setStravaCredentials(athleteId, credentials),
    ctx.db.setStravaScopes(athleteId, scopes),
    ctx.db.updateSession(session.sessionId, newSession),
  ]);

  ctx.state.session = newSession;

  return credentials;
};

export const stravaOauth = async (ctx: AppContext, next: AppNext) => {
  if (ctx.state.route.path !== "/strava-oauth") {
    return next();
  }

  if (ctx.query.error) {
    console.log("strava auth error", ctx.query.error);

    ctx.redirect("/");
  }

  try {
    await auth(ctx);
  } catch (error) {
    console.log("strava auth error", error);
  }

  ctx.redirect("/");
};
