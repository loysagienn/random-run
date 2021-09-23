import type { StravaScope, AthleteId } from "types";
import type { Db } from "mongodb";
import { STRAVA_SCOPES } from "../collections";

type Data = {
  athleteId: AthleteId;
  scopes: StravaScope[];
};

export const getStravaScopes =
  (db: Db) =>
  (athleteId: AthleteId): Promise<StravaScope[] | undefined> =>
    db
      .collection<Data>(STRAVA_SCOPES)
      .find({ athleteId })
      .toArray()
      .then(([data]) => data && data.scopes);

export const setStravaScopes = (db: Db) => {
  const getDbStravaScopes = getStravaScopes(db);

  return async (athleteId: AthleteId, scopes: StravaScope[]) => {
    const data = { athleteId, scopes };

    const existingScopes = await getDbStravaScopes(athleteId);

    if (existingScopes) {
      return db
        .collection<Data>(STRAVA_SCOPES)
        .updateOne({ athleteId }, { $set: data });
    }

    return db.collection<Data>(STRAVA_SCOPES).insertOne(data);
  };
};

export const removeStravaScopes = (db: Db) => (athleteId: AthleteId) =>
  db.collection<Data>(STRAVA_SCOPES).deleteOne({ athleteId });
