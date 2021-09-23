import { stringifyNumber } from "utils";

export const getMonthKey = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  return `${year}-${stringifyNumber(month, 2)}`;
};
