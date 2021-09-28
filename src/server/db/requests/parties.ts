import type { Party, PartyId } from "types";
import type { Db } from "mongodb";
import { PARTIES } from "../collections";

export const getParty =
  (db: Db) =>
  (partyId: PartyId): Promise<Party | undefined> =>
    db
      .collection<Party>(PARTIES)
      .find({ id: partyId })
      .toArray()
      .then(([party]) => party);

export const addParty = (db: Db) => {
  const getDbParty = getParty(db);

  return async (party: Party) => {
    const existingParty = await getDbParty(party.id);

    if (existingParty) {
      throw new Error(`Party ${party.id} already exists`);
    }

    return db.collection<Party>(PARTIES).insertOne(party);
  };
};

export const updateParty = (db: Db) => async (party: Party) =>
  db.collection<Party>(PARTIES).updateOne({ id: party.id }, { $set: party });

export const removeParty = (db: Db) => (id: PartyId) =>
  db.collection<Party>(PARTIES).deleteOne({ id });
