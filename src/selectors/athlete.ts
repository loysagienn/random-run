import { createSelector } from "reselect";
import { State, Athlete } from "types";

export const selectAthlete = (state: State): Athlete | null => state.athlete;
