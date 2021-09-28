import type { Party, CreatePartyParams, AppContext } from "types";
import { getDbInstance } from "server/db";
import { generateId, RunError } from "utils";

export const createParty =
  (ctx: AppContext) =>
  async ({ monthDayKey, timeKey, coords }: CreatePartyParams) => {
    const athleteId = ctx.state.athlete && ctx.state.athlete.id;

    if (!athleteId) {
      throw new RunError("create_party_forbidden_no_athlete", {
        statusCode: 403,
        message: "Forbidden, no athlete id",
      });
    }

    let id = generateId(12);
    let existingParty = await ctx.db.getParty(id);

    while (existingParty) {
      id = generateId(12);
      existingParty = await ctx.db.getParty(id);
    }

    const party: Party = {
      id,
      monthDayKey,
      timeKey,
      coords,
      athleteId,
    };

    await ctx.db.addParty(party);

    return party;
  };
