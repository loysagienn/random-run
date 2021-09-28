import type { Party, PartyId, AthleteId, Coords } from "types";
import type { Db } from "mongodb";
import { getTimestamp } from "utils";
import { PARTIES } from "../collections";

type PartyData = {
  id: PartyId;
  athleteId: AthleteId;
  monthDayKey: string;
  timeKey: string;
  latitude: number;
  longitude: number;
  timestamp: number;
};

const readParty = (partyData: PartyData): Party => {
  const { id, athleteId, monthDayKey, timeKey, latitude, longitude } =
    partyData;

  return {
    id,
    athleteId,
    monthDayKey,
    timeKey,
    coords: [latitude, longitude],
  };
};

const writeParty = (party: Party): PartyData => {
  const { id, athleteId, monthDayKey, timeKey, coords } = party;
  const [latitude, longitude] = coords;

  return {
    id,
    athleteId,
    monthDayKey,
    timeKey,
    latitude,
    longitude,
    timestamp: getTimestamp(monthDayKey, timeKey),
  };
};

export const getParty =
  (db: Db) =>
  (partyId: PartyId): Promise<Party | undefined> =>
    db
      .collection<PartyData>(PARTIES)
      .find({ id: partyId })
      .limit(1)
      .toArray()
      .then(([party]) => party && readParty(party));

export const getParties = (db: Db) => (): Promise<Party[]> =>
  db
    .collection<PartyData>(PARTIES)
    .find({})
    .limit(1000)
    .toArray()
    .then((data) => data.map(readParty));

export const addParty = (db: Db) => {
  const getDbParty = getParty(db);

  return async (party: Party) => {
    const existingParty = await getDbParty(party.id);

    if (existingParty) {
      throw new Error(`Party ${party.id} already exists`);
    }

    return db.collection<PartyData>(PARTIES).insertOne(writeParty(party));
  };
};

export const updateParty = (db: Db) => async (party: Party) =>
  db
    .collection<PartyData>(PARTIES)
    .updateOne({ id: party.id }, { $set: writeParty(party) });

export const removeParty = (db: Db) => (id: PartyId) =>
  db.collection<PartyData>(PARTIES).deleteOne({ id });
