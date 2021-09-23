import { updateOauthToken } from "stravaApi";
import type { AppContext, AppNext } from "types";
import { removeAthleteCredentials } from "./utils";

const EXPIRES_SHIFT = 60; // one minute

export const stravaCredentials = async (ctx: AppContext, next: AppNext) => {
  const { athleteId } = ctx.state.session;

  if (!athleteId) {
    return next();
  }

  const credentials = await ctx.db.getStravaCredentials(athleteId);

  if (!credentials) {
    return next();
  }

  const now = Date.now() / 1000;

  // если срок действия токена больше минуты - все ок, иначе обновляем токен
  if (credentials.expiresAt - EXPIRES_SHIFT > now) {
    ctx.state.stravaCredentials = credentials;

    return next();
  }

  try {
    const newCredentials = await updateOauthToken(credentials);

    await ctx.db.setStravaCredentials(athleteId, newCredentials);

    ctx.state.stravaCredentials = newCredentials;
  } catch (error) {
    const statusCode = (error.response && error.response.statusCode) || null;

    if (statusCode === 400 || statusCode === 401) {
      await removeAthleteCredentials(ctx);
    }
  }

  return next();
};
