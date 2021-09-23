import type { Session } from "types";
import type { Db } from "mongodb";
import { SESSIONS } from "../collections";

export const getSession =
  (db: Db) =>
  (sessionId: string): Promise<Session | undefined> =>
    db
      .collection<Session>(SESSIONS)
      .find({ sessionId })
      .toArray()
      .then(([session]) => session);

export const addSession = (db: Db) => {
  const getDbSession = getSession(db);

  return async (session: Session) => {
    const existingSession = await getDbSession(session.sessionId);

    if (existingSession) {
      throw new Error(`Session ${session.sessionId} already exists`);
    }

    return db.collection<Session>(SESSIONS).insertOne(session);
  };
};

export const updateSession =
  (db: Db) => async (sessionId: string, update: Session) =>
    db.collection<Session>(SESSIONS).updateOne({ sessionId }, { $set: update });
