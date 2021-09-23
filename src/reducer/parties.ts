import { createReducer } from "utils";
import { Party } from "types";

export const parties = createReducer<Party[]>({}, []);
