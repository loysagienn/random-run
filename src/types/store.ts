import type { Store as ReduxStore } from "redux";
import type { State } from "reducer";
import type {
  NewPartyAction,
  ClearPartyDraftAction,
  InitAction,
  SetPartyDraftAction,
} from "actions";

export type { State };

export type AnyAction =
  | NewPartyAction
  | ClearPartyDraftAction
  | InitAction
  | SetPartyDraftAction;

export type ActionType = AnyAction["type"];

export type Action<TActionType extends ActionType = ActionType> = Extract<
  AnyAction,
  { type: TActionType }
>;

export type Store = ReduxStore<State, Action>;
