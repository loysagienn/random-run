import { combineReducers } from "redux";
import { athlete } from "./athlete";
import { parties } from "./parties";
import { partyDraft } from "./partyDraft";
import { date } from "./date";

export const reducer = combineReducers({ athlete, parties, partyDraft, date });

export type State = ReturnType<typeof reducer>;
