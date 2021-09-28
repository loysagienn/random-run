import { createReducer } from "utils";
import { Party } from "types";

export const parties = createReducer<Party[]>(
  {
    CREATE_PARTY_ACTION_DONE: (state, { party }) => state.concat(party),
  },
  []
);
