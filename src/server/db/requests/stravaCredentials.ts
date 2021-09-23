import type { StravaCredentials, AthleteId, Athlete } from "types";
import type { Db } from "mongodb";
import { STRAVA_CREDENTIALS } from "../collections";

type Data = {
  athleteId: AthleteId;
  credentials: StravaCredentials;
};

export const getStravaCredentials =
  (db: Db) =>
  (athleteId: AthleteId): Promise<StravaCredentials | undefined> =>
    db
      .collection<Data>(STRAVA_CREDENTIALS)
      .find({ athleteId })
      .toArray()
      .then(([data]) => data && data.credentials);

export const setStravaCredentials = (db: Db) => {
  const getDbStravaCredentials = getStravaCredentials(db);

  return async (athleteId: AthleteId, credentials: StravaCredentials) => {
    const existingCredentials = await getDbStravaCredentials(athleteId);

    const data = { athleteId, credentials };

    if (existingCredentials) {
      return db
        .collection<Data>(STRAVA_CREDENTIALS)
        .updateOne({ athleteId }, { $set: data });
    }

    return db.collection<Data>(STRAVA_CREDENTIALS).insertOne(data);
  };
};

export const removeStravaCredentials = (db: Db) => (athleteId: AthleteId) =>
  db.collection<Data>(STRAVA_CREDENTIALS).deleteOne({ athleteId });
