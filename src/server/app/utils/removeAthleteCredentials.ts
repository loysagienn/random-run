import { getAthlete } from "stravaApi";
import type { AppContext, AppNext } from "types";

export const removeAthleteCredentials = async (ctx: AppContext) => {
  const { session } = ctx.state;
  const { athleteId } = session;

  if (!athleteId) {
    return;
  }

  const newSession = { ...session, athleteId: null };

  await Promise.all([
    ctx.db.updateSession(session.sessionId, newSession),
    ctx.db.removeStravaCredentials(athleteId),
  ]);
};
