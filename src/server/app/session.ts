import { generateId } from "utils";
import { DOMAIN, SESSION_ID_COOKIE_NAME } from "config";
import type { Session, AppContext, AppNext } from "types";

const SESSION_ID_LENGTH = 32;
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30; // 30 days

const createSession = (ctx: AppContext): Session => ({
  sessionId: generateId(SESSION_ID_LENGTH),
  userAgent: ctx.headers["user-agent"] || null,
  timestamp: Date.now(),
  athleteId: null,
});

const getSession = async (ctx: AppContext): Promise<Session> => {
  const { cookies } = ctx;

  const sessionId = cookies.get(SESSION_ID_COOKIE_NAME);

  if (sessionId) {
    const session = await ctx.db.getSession(sessionId);

    if (session) {
      return session;
    }
  }

  const session = createSession(ctx);

  // todo: error handling
  await ctx.db.addSession(session);

  cookies.set(SESSION_ID_COOKIE_NAME, session.sessionId, {
    domain: DOMAIN,
    maxAge: COOKIE_MAX_AGE,
  });

  return session;
};

export const session = async (ctx: AppContext, next: AppNext) => {
  const session = await getSession(ctx);

  ctx.state.session = session;

  return next();
};
