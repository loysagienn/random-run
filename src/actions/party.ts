import { PartyDraft, Party, Dispatch, GetState, Api } from "types";
import { selectCurrentMonthDayKey, selectPartyDraft } from "selectors";
import { RunError } from "utils";

export type NewPartyAction = {
  type: "NEW_PARTY";
};
export const newPartyAction = (): NewPartyAction => ({ type: "NEW_PARTY" });

export type ClearPartyDraftAction = {
  type: "CLEAR_PARTY_DRAFT";
};
export const clearPartyDraftAction = (): ClearPartyDraftAction => ({
  type: "CLEAR_PARTY_DRAFT",
});

export type SetPartyDraftAction = {
  type: "SET_PARTY_DRAFT";
  partyDraft: PartyDraft;
};
export const setPartyDraftAction = (
  partyDraft: PartyDraft
): SetPartyDraftAction => ({
  type: "SET_PARTY_DRAFT",
  partyDraft,
});

export type InitAction = {
  type: "@@INIT";
};

export type CreatePartyInitAction = {
  type: "CREATE_PARTY_ACTION_INIT";
  partyDraft: PartyDraft;
};
export const createPartyInitAction = (
  partyDraft: PartyDraft
): CreatePartyInitAction => ({
  type: "CREATE_PARTY_ACTION_INIT",
  partyDraft,
});

export type CreatePartyDoneAction = {
  type: "CREATE_PARTY_ACTION_DONE";
  partyDraft: PartyDraft;
  party: Party;
};
export const createPartyDoneAction = (
  partyDraft: PartyDraft,
  party: Party
): CreatePartyDoneAction => ({
  type: "CREATE_PARTY_ACTION_DONE",
  partyDraft,
  party,
});

export type CreatePartyFailAction = {
  type: "CREATE_PARTY_ACTION_FAIL";
  partyDraft: PartyDraft;
  error: RunError;
};
export const createPartyFailAction = (
  partyDraft: PartyDraft,
  error: RunError
): CreatePartyFailAction => ({
  type: "CREATE_PARTY_ACTION_FAIL",
  partyDraft,
  error,
});

export const createPartyAction =
  () => (dispatch: Dispatch, getState: GetState, api: Api) => {
    const partyDraft = selectPartyDraft(getState());

    if (!partyDraft) {
      return;
    }

    dispatch(createPartyInitAction(partyDraft));

    api
      .createParty({
        monthDayKey:
          partyDraft.monthDayKey || selectCurrentMonthDayKey(getState()),
        timeKey: partyDraft.timeKey || "20:00",
        coords: partyDraft.coords || [55.7292, 37.6016],
      })
      .then((party) => {
        dispatch(createPartyDoneAction(partyDraft, party));
      })
      .catch((error) => {
        dispatch(createPartyFailAction(partyDraft, error));
      });
  };
