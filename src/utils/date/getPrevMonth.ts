import { getMonthKey, getMonthDate } from "utils";

export const getPrevMonth = (monthKey: string): string => {
  const date = getMonthDate(monthKey);

  date.setMonth(date.getMonth() - 1);

  return getMonthKey(date);
};
