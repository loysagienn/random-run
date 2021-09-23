import { createReducer, getMonthKey, getMonthDayKey } from "utils";
import { Party } from "types";

type DateState = {
  currentMonthKey: string;
  currentMonthDayKey: string;
};

export const getDefaultState = (): DateState => {
  const date = new Date();

  return {
    currentMonthKey: getMonthKey(date),
    currentMonthDayKey: getMonthDayKey(date),
  };
};

export const date = createReducer<DateState>(
  {
    "@@INIT": () => getDefaultState(),
  },
  getDefaultState()
);
