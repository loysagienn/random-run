import { createSelector } from "reselect";
import { State, Party, PartyDraft } from "types";

export const selectParties = (state: State): Party[] => state.parties;

export const selectPartyDraft = (state: State) => state.partyDraft;
