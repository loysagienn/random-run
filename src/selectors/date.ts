import { createSelector } from "reselect";
import { State, MonthDay } from "types";
import { getMonthDayDate } from "utils";

export const selectCurrentMonthKey = (state: State): string =>
  state.date.currentMonthKey;

export const selectCurrentMonthDayKey = (state: State): string =>
  state.date.currentMonthDayKey;

export const selectCurrentMonthIsoDate = createSelector<State, string, string>(
  selectCurrentMonthKey,
  (monthKey) => {
    const [year, month] = monthKey.split("-");

    const date = new Date(Number(year), Number(month) - 1);

    return date.toISOString();
  }
);

export const selectCurrentMonthDayIsoDate = createSelector<
  State,
  string,
  string
>(selectCurrentMonthDayKey, (monthDayKey) => {
  const date = getMonthDayDate(monthDayKey);

  return date.toISOString();
});
