import { getAthlete } from "stravaApi";
import type { AppContext, AppNext, Athlete } from "types";
import { removeAthleteCredentials } from "./utils";

export const athlete = async (ctx: AppContext, next: AppNext) => {
  const { stravaCredentials } = ctx.state;

  if (!stravaCredentials) {
    return next();
  }

  try {
    const athlete = await getAthlete(stravaCredentials);

    ctx.state.athlete = athlete;
  } catch (error) {
    if (error.response && error.response.statusCode === 401) {
      await removeAthleteCredentials(ctx);
    }
  }

  return next();
};
