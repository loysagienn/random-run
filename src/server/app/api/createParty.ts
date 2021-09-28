import type { AppContext, Coords } from "types";

export type Body = {
  monthDayKey: string;
  timeKey: string;
  coords: Coords;
};

export const createParty = async (ctx: AppContext) => {
  const { monthDayKey, timeKey, coords } = ctx.request.body as Body;

  const party = await ctx.state.api.createParty({
    monthDayKey,
    timeKey,
    coords,
  });

  ctx.body = party;
};
