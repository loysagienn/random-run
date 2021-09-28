import { createReducer } from "utils";
import { PartyDraft } from "types";

export const partyDraft = createReducer<PartyDraft | null>(
  {
    NEW_PARTY: () => ({}),
    CLEAR_PARTY_DRAFT: () => null,
    SET_PARTY_DRAFT: (state, action) =>
      Object.assign({}, state, action.partyDraft),
    CREATE_PARTY_ACTION_DONE: () => null,
  },
  null
);
