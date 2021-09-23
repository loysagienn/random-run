import { createReducer } from "utils";
import { Athlete } from "types";

export const athlete = createReducer<Athlete | null>({}, null);
