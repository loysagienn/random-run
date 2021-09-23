import { PartyDraft } from "types";

export type NewPartyAction = {
  type: "NEW_PARTY";
};

export type ClearPartyDraftAction = {
  type: "CLEAR_PARTY_DRAFT";
};

export type SetPartyDraftAction = {
  type: "SET_PARTY_DRAFT";
  partyDraft: PartyDraft;
};

export const newPartyAction = (): NewPartyAction => ({ type: "NEW_PARTY" });

export const clearPartyDraftAction = (): ClearPartyDraftAction => ({
  type: "CLEAR_PARTY_DRAFT",
});

export const setPartyDraftAction = (
  partyDraft: PartyDraft
): SetPartyDraftAction => ({
  type: "SET_PARTY_DRAFT",
  partyDraft,
});

export type InitAction = {
  type: "@@INIT";
};
