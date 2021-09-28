import { AppContext, AppNext } from "types";

import { getDefaultState } from "reducer/date";

export async function initialState(ctx: AppContext, next: AppNext) {
  const parties = await ctx.db.getParties();

  ctx.state.initialState = {
    athlete: ctx.state.athlete || null,
    parties,
    partyDraft: null,
    date: getDefaultState(),
  };

  return next();
}
