import { stringifyNumber } from "utils";

export const getMonthDayKey = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${stringifyNumber(month, 2)}-${stringifyNumber(day, 2)}`;
};
